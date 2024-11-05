const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Data_asset_entity_mapDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const data_asset_entity_map = await db.data_asset_entity_map.create(
      {
        id: data.id || undefined,

        modified_at: data.modified_at || null,
        modified_by: data.modified_by || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await data_asset_entity_map.setAsset_aide(data.asset_aide || null, {
      transaction,
    });

    await data_asset_entity_map.setEntity_aide(data.entity_aide || null, {
      transaction,
    });

    return data_asset_entity_map;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const data_asset_entity_mapData = data.map((item, index) => ({
      id: item.id || undefined,

      modified_at: item.modified_at || null,
      modified_by: item.modified_by || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const data_asset_entity_map = await db.data_asset_entity_map.bulkCreate(
      data_asset_entity_mapData,
      { transaction },
    );

    // For each item created, replace relation files

    return data_asset_entity_map;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const data_asset_entity_map = await db.data_asset_entity_map.findByPk(
      id,
      {},
      { transaction },
    );

    await data_asset_entity_map.update(
      {
        modified_at: data.modified_at || null,
        modified_by: data.modified_by || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await data_asset_entity_map.setAsset_aide(data.asset_aide || null, {
      transaction,
    });

    await data_asset_entity_map.setEntity_aide(data.entity_aide || null, {
      transaction,
    });

    return data_asset_entity_map;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const data_asset_entity_map = await db.data_asset_entity_map.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of data_asset_entity_map) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of data_asset_entity_map) {
        await record.destroy({ transaction });
      }
    });

    return data_asset_entity_map;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const data_asset_entity_map = await db.data_asset_entity_map.findByPk(
      id,
      options,
    );

    await data_asset_entity_map.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await data_asset_entity_map.destroy({
      transaction,
    });

    return data_asset_entity_map;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const data_asset_entity_map = await db.data_asset_entity_map.findOne(
      { where },
      { transaction },
    );

    if (!data_asset_entity_map) {
      return data_asset_entity_map;
    }

    const output = data_asset_entity_map.get({ plain: true });

    output.asset_aide = await data_asset_entity_map.getAsset_aide({
      transaction,
    });

    output.entity_aide = await data_asset_entity_map.getEntity_aide({
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
        model: db.data_asset_info,
        as: 'asset_aide',
      },

      {
        model: db.entity_info,
        as: 'entity_aide',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.modified_by) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'data_asset_entity_map',
            'modified_by',
            filter.modified_by,
          ),
        };
      }

      if (filter.modified_atRange) {
        const [start, end] = filter.modified_atRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            modified_at: {
              ...where.modified_at,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            modified_at: {
              ...where.modified_at,
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

      if (filter.asset_aide) {
        const listItems = filter.asset_aide.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          asset_aideId: { [Op.or]: listItems },
        };
      }

      if (filter.entity_aide) {
        const listItems = filter.entity_aide.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          entity_aideId: { [Op.or]: listItems },
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
          count: await db.data_asset_entity_map.count({
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
      : await db.data_asset_entity_map.findAndCountAll({
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
          Utils.ilike('data_asset_entity_map', 'id', query),
        ],
      };
    }

    const records = await db.data_asset_entity_map.findAll({
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
