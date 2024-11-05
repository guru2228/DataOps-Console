const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Data_asset_infoDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const data_asset_info = await db.data_asset_info.create(
      {
        id: data.id || undefined,

        aide: data.aide || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return data_asset_info;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const data_asset_infoData = data.map((item, index) => ({
      id: item.id || undefined,

      aide: item.aide || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const data_asset_info = await db.data_asset_info.bulkCreate(
      data_asset_infoData,
      { transaction },
    );

    // For each item created, replace relation files

    return data_asset_info;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const data_asset_info = await db.data_asset_info.findByPk(
      id,
      {},
      { transaction },
    );

    await data_asset_info.update(
      {
        aide: data.aide || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return data_asset_info;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const data_asset_info = await db.data_asset_info.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of data_asset_info) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of data_asset_info) {
        await record.destroy({ transaction });
      }
    });

    return data_asset_info;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const data_asset_info = await db.data_asset_info.findByPk(id, options);

    await data_asset_info.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await data_asset_info.destroy({
      transaction,
    });

    return data_asset_info;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const data_asset_info = await db.data_asset_info.findOne(
      { where },
      { transaction },
    );

    if (!data_asset_info) {
      return data_asset_info;
    }

    const output = data_asset_info.get({ plain: true });

    output.contact_info_aide = await data_asset_info.getContact_info_aide({
      transaction,
    });

    output.data_asset_entity_map_asset_aide =
      await data_asset_info.getData_asset_entity_map_asset_aide({
        transaction,
      });

    output.data_asset_type_aide = await data_asset_info.getData_asset_type_aide(
      {
        transaction,
      },
    );

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

      if (filter.aide) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('data_asset_info', 'aide', filter.aide),
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
          count: await db.data_asset_info.count({
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
      : await db.data_asset_info.findAndCountAll({
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
          Utils.ilike('data_asset_info', 'id', query),
        ],
      };
    }

    const records = await db.data_asset_info.findAll({
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
