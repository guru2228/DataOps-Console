const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Cli_orgDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cli_org = await db.cli_org.create(
      {
        id: data.id || undefined,

        cli_org_id: data.cli_org_id || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return cli_org;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const cli_orgData = data.map((item, index) => ({
      id: item.id || undefined,

      cli_org_id: item.cli_org_id || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const cli_org = await db.cli_org.bulkCreate(cli_orgData, { transaction });

    // For each item created, replace relation files

    return cli_org;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const cli_org = await db.cli_org.findByPk(id, {}, { transaction });

    await cli_org.update(
      {
        cli_org_id: data.cli_org_id || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return cli_org;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cli_org = await db.cli_org.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of cli_org) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of cli_org) {
        await record.destroy({ transaction });
      }
    });

    return cli_org;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cli_org = await db.cli_org.findByPk(id, options);

    await cli_org.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await cli_org.destroy({
      transaction,
    });

    return cli_org;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const cli_org = await db.cli_org.findOne({ where }, { transaction });

    if (!cli_org) {
      return cli_org;
    }

    const output = cli_org.get({ plain: true });

    output.cli_org_admins_cli_org_id =
      await cli_org.getCli_org_admins_cli_org_id({
        transaction,
      });

    output.cli_org_entity_info_cli_org_aide =
      await cli_org.getCli_org_entity_info_cli_org_aide({
        transaction,
      });

    output.cli_org_grp_cli_org_grp_id =
      await cli_org.getCli_org_grp_cli_org_grp_id({
        transaction,
      });

    output.cli_org_grp_cli_org_id = await cli_org.getCli_org_grp_cli_org_id({
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

      if (filter.cli_org_id) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('cli_org', 'cli_org_id', filter.cli_org_id),
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
          count: await db.cli_org.count({
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
      : await db.cli_org.findAndCountAll({
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
          Utils.ilike('cli_org', 'id', query),
        ],
      };
    }

    const records = await db.cli_org.findAll({
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
