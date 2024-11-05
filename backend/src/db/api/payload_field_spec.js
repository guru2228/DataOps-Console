const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Payload_field_specDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const payload_field_spec = await db.payload_field_spec.create(
      {
        id: data.id || undefined,

        payload_field_spec_id: data.payload_field_spec_id || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return payload_field_spec;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const payload_field_specData = data.map((item, index) => ({
      id: item.id || undefined,

      payload_field_spec_id: item.payload_field_spec_id || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const payload_field_spec = await db.payload_field_spec.bulkCreate(
      payload_field_specData,
      { transaction },
    );

    // For each item created, replace relation files

    return payload_field_spec;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const payload_field_spec = await db.payload_field_spec.findByPk(
      id,
      {},
      { transaction },
    );

    await payload_field_spec.update(
      {
        payload_field_spec_id: data.payload_field_spec_id || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return payload_field_spec;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const payload_field_spec = await db.payload_field_spec.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of payload_field_spec) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of payload_field_spec) {
        await record.destroy({ transaction });
      }
    });

    return payload_field_spec;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const payload_field_spec = await db.payload_field_spec.findByPk(
      id,
      options,
    );

    await payload_field_spec.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await payload_field_spec.destroy({
      transaction,
    });

    return payload_field_spec;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const payload_field_spec = await db.payload_field_spec.findOne(
      { where },
      { transaction },
    );

    if (!payload_field_spec) {
      return payload_field_spec;
    }

    const output = payload_field_spec.get({ plain: true });

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

      if (filter.payload_field_spec_idRange) {
        const [start, end] = filter.payload_field_spec_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            payload_field_spec_id: {
              ...where.payload_field_spec_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            payload_field_spec_id: {
              ...where.payload_field_spec_id,
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
          count: await db.payload_field_spec.count({
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
      : await db.payload_field_spec.findAndCountAll({
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
          Utils.ilike('payload_field_spec', 'id', query),
        ],
      };
    }

    const records = await db.payload_field_spec.findAll({
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
