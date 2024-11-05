const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Client_orgsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const client_orgs = await db.client_orgs.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return client_orgs;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const client_orgsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const client_orgs = await db.client_orgs.bulkCreate(client_orgsData, {
      transaction,
    });

    // For each item created, replace relation files

    return client_orgs;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const client_orgs = await db.client_orgs.findByPk(id, {}, { transaction });

    await client_orgs.update(
      {
        name: data.name || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return client_orgs;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const client_orgs = await db.client_orgs.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of client_orgs) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of client_orgs) {
        await record.destroy({ transaction });
      }
    });

    return client_orgs;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const client_orgs = await db.client_orgs.findByPk(id, options);

    await client_orgs.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await client_orgs.destroy({
      transaction,
    });

    return client_orgs;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const client_orgs = await db.client_orgs.findOne(
      { where },
      { transaction },
    );

    if (!client_orgs) {
      return client_orgs;
    }

    const output = client_orgs.get({ plain: true });

    output.users_client_org = await client_orgs.getUsers_client_org({
      transaction,
    });

    output.connectors_client_org = await client_orgs.getConnectors_client_org({
      transaction,
    });

    output.data_assets_client_org = await client_orgs.getData_assets_client_org(
      {
        transaction,
      },
    );

    output.integrations_client_org =
      await client_orgs.getIntegrations_client_org({
        transaction,
      });

    output.pipeline_steps_client_org =
      await client_orgs.getPipeline_steps_client_org({
        transaction,
      });

    output.pipelines_client_org = await client_orgs.getPipelines_client_org({
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
    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('client_orgs', 'name', filter.name),
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
          count: await db.client_orgs.count({
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
      : await db.client_orgs.findAndCountAll({
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
          Utils.ilike('client_orgs', 'name', query),
        ],
      };
    }

    const records = await db.client_orgs.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
