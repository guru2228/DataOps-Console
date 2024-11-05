const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Cli_org_grpDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cli_org_grp = await db.cli_org_grp.create(
      {
        id: data.id || undefined,

        start_dttm: data.start_dttm || null,
        end_dttm: data.end_dttm || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await cli_org_grp.setCli_org_grp_id(data.cli_org_grp_id || null, {
      transaction,
    });

    await cli_org_grp.setCli_org_id(data.cli_org_id || null, {
      transaction,
    });

    return cli_org_grp;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const cli_org_grpData = data.map((item, index) => ({
      id: item.id || undefined,

      start_dttm: item.start_dttm || null,
      end_dttm: item.end_dttm || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const cli_org_grp = await db.cli_org_grp.bulkCreate(cli_org_grpData, {
      transaction,
    });

    // For each item created, replace relation files

    return cli_org_grp;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const cli_org_grp = await db.cli_org_grp.findByPk(id, {}, { transaction });

    await cli_org_grp.update(
      {
        start_dttm: data.start_dttm || null,
        end_dttm: data.end_dttm || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await cli_org_grp.setCli_org_grp_id(data.cli_org_grp_id || null, {
      transaction,
    });

    await cli_org_grp.setCli_org_id(data.cli_org_id || null, {
      transaction,
    });

    return cli_org_grp;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cli_org_grp = await db.cli_org_grp.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of cli_org_grp) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of cli_org_grp) {
        await record.destroy({ transaction });
      }
    });

    return cli_org_grp;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cli_org_grp = await db.cli_org_grp.findByPk(id, options);

    await cli_org_grp.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await cli_org_grp.destroy({
      transaction,
    });

    return cli_org_grp;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const cli_org_grp = await db.cli_org_grp.findOne(
      { where },
      { transaction },
    );

    if (!cli_org_grp) {
      return cli_org_grp;
    }

    const output = cli_org_grp.get({ plain: true });

    output.cli_org_grp_id = await cli_org_grp.getCli_org_grp_id({
      transaction,
    });

    output.cli_org_id = await cli_org_grp.getCli_org_id({
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
        as: 'cli_org_grp_id',
      },

      {
        model: db.cli_org,
        as: 'cli_org_id',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.start_dttmRange) {
        const [start, end] = filter.start_dttmRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            start_dttm: {
              ...where.start_dttm,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            start_dttm: {
              ...where.start_dttm,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.end_dttmRange) {
        const [start, end] = filter.end_dttmRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            end_dttm: {
              ...where.end_dttm,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            end_dttm: {
              ...where.end_dttm,
              [Op.lte]: end,
            },
          };
        }
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

      if (filter.cli_org_grp_id) {
        const listItems = filter.cli_org_grp_id.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          cli_org_grp_idId: { [Op.or]: listItems },
        };
      }

      if (filter.cli_org_id) {
        const listItems = filter.cli_org_id.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          cli_org_idId: { [Op.or]: listItems },
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
          count: await db.cli_org_grp.count({
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
      : await db.cli_org_grp.findAndCountAll({
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
          Utils.ilike('cli_org_grp', 'id', query),
        ],
      };
    }

    const records = await db.cli_org_grp.findAll({
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
