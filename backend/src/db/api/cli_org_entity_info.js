const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Cli_org_entity_infoDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cli_org_entity_info = await db.cli_org_entity_info.create(
      {
        id: data.id || undefined,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await cli_org_entity_info.setCli_org_aide(data.cli_org_aide || null, {
      transaction,
    });

    await cli_org_entity_info.setEntity_info_aide(
      data.entity_info_aide || null,
      {
        transaction,
      },
    );

    return cli_org_entity_info;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const cli_org_entity_infoData = data.map((item, index) => ({
      id: item.id || undefined,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const cli_org_entity_info = await db.cli_org_entity_info.bulkCreate(
      cli_org_entity_infoData,
      { transaction },
    );

    // For each item created, replace relation files

    return cli_org_entity_info;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const cli_org_entity_info = await db.cli_org_entity_info.findByPk(
      id,
      {},
      { transaction },
    );

    await cli_org_entity_info.update(
      {
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await cli_org_entity_info.setCli_org_aide(data.cli_org_aide || null, {
      transaction,
    });

    await cli_org_entity_info.setEntity_info_aide(
      data.entity_info_aide || null,
      {
        transaction,
      },
    );

    return cli_org_entity_info;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cli_org_entity_info = await db.cli_org_entity_info.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of cli_org_entity_info) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of cli_org_entity_info) {
        await record.destroy({ transaction });
      }
    });

    return cli_org_entity_info;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cli_org_entity_info = await db.cli_org_entity_info.findByPk(
      id,
      options,
    );

    await cli_org_entity_info.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await cli_org_entity_info.destroy({
      transaction,
    });

    return cli_org_entity_info;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const cli_org_entity_info = await db.cli_org_entity_info.findOne(
      { where },
      { transaction },
    );

    if (!cli_org_entity_info) {
      return cli_org_entity_info;
    }

    const output = cli_org_entity_info.get({ plain: true });

    output.cli_org_aide = await cli_org_entity_info.getCli_org_aide({
      transaction,
    });

    output.entity_info_aide = await cli_org_entity_info.getEntity_info_aide({
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
        model: db.cli_org,
        as: 'cli_org_aide',
      },

      {
        model: db.entity_info,
        as: 'entity_info_aide',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
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

      if (filter.cli_org_aide) {
        const listItems = filter.cli_org_aide.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          cli_org_aideId: { [Op.or]: listItems },
        };
      }

      if (filter.entity_info_aide) {
        const listItems = filter.entity_info_aide.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          entity_info_aideId: { [Op.or]: listItems },
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
          count: await db.cli_org_entity_info.count({
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
      : await db.cli_org_entity_info.findAndCountAll({
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
          Utils.ilike('cli_org_entity_info', 'id', query),
        ],
      };
    }

    const records = await db.cli_org_entity_info.findAll({
      attributes: ['id', 'id'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['id', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.id,
    }));
  }
};
