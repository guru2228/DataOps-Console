const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class IntegrationsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const integrations = await db.integrations.create(
      {
        id: data.id || undefined,

        integration_name: data.integration_name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await integrations.setClient_org(data.client_org || null, {
      transaction,
    });

    await integrations.setConnectors(data.connectors || [], {
      transaction,
    });

    await integrations.setPipelines(data.pipelines || [], {
      transaction,
    });

    return integrations;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const integrationsData = data.map((item, index) => ({
      id: item.id || undefined,

      integration_name: item.integration_name || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const integrations = await db.integrations.bulkCreate(integrationsData, {
      transaction,
    });

    // For each item created, replace relation files

    return integrations;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const integrations = await db.integrations.findByPk(
      id,
      {},
      { transaction },
    );

    await integrations.update(
      {
        integration_name: data.integration_name || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await integrations.setClient_org(data.client_org || null, {
      transaction,
    });

    await integrations.setConnectors(data.connectors || [], {
      transaction,
    });

    await integrations.setPipelines(data.pipelines || [], {
      transaction,
    });

    return integrations;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const integrations = await db.integrations.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of integrations) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of integrations) {
        await record.destroy({ transaction });
      }
    });

    return integrations;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const integrations = await db.integrations.findByPk(id, options);

    await integrations.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await integrations.destroy({
      transaction,
    });

    return integrations;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const integrations = await db.integrations.findOne(
      { where },
      { transaction },
    );

    if (!integrations) {
      return integrations;
    }

    const output = integrations.get({ plain: true });

    output.connectors = await integrations.getConnectors({
      transaction,
    });

    output.pipelines = await integrations.getPipelines({
      transaction,
    });

    output.client_org = await integrations.getClient_org({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.client_orgs,
        as: 'client_org',
      },

      {
        model: db.connectors,
        as: 'connectors',
        through: filter.connectors
          ? {
              where: {
                [Op.or]: filter.connectors.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.connectors ? true : null,
      },

      {
        model: db.pipelines,
        as: 'pipelines',
        through: filter.pipelines
          ? {
              where: {
                [Op.or]: filter.pipelines.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.pipelines ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.integration_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'integrations',
            'integration_name',
            filter.integration_name,
          ),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.client_org) {
        const listItems = filter.client_org.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          client_orgId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.integrations.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.integrations.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('integrations', 'integration_name', query),
        ],
      };
    }

    const records = await db.integrations.findAll({
      attributes: ['id', 'integration_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['integration_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.integration_name,
    }));
  }
};
