const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ConnectorsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const connectors = await db.connectors.create(
      {
        id: data.id || undefined,

        connector_spec: data.connector_spec || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await connectors.setClient_org(data.client_org || null, {
      transaction,
    });

    return connectors;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const connectorsData = data.map((item, index) => ({
      id: item.id || undefined,

      connector_spec: item.connector_spec || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const connectors = await db.connectors.bulkCreate(connectorsData, {
      transaction,
    });

    // For each item created, replace relation files

    return connectors;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const connectors = await db.connectors.findByPk(id, {}, { transaction });

    await connectors.update(
      {
        connector_spec: data.connector_spec || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await connectors.setClient_org(data.client_org || null, {
      transaction,
    });

    return connectors;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const connectors = await db.connectors.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of connectors) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of connectors) {
        await record.destroy({ transaction });
      }
    });

    return connectors;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const connectors = await db.connectors.findByPk(id, options);

    await connectors.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await connectors.destroy({
      transaction,
    });

    return connectors;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const connectors = await db.connectors.findOne({ where }, { transaction });

    if (!connectors) {
      return connectors;
    }

    const output = connectors.get({ plain: true });

    output.client_org = await connectors.getClient_org({
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
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.connector_spec) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'connectors',
            'connector_spec',
            filter.connector_spec,
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
          count: await db.connectors.count({
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
      : await db.connectors.findAndCountAll({
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
          Utils.ilike('connectors', 'connector_spec', query),
        ],
      };
    }

    const records = await db.connectors.findAll({
      attributes: ['id', 'connector_spec'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['connector_spec', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.connector_spec,
    }));
  }
};
