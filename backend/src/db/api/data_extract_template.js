const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Data_extract_templateDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const data_extract_template = await db.data_extract_template.create(
      {
        id: data.id || undefined,

        asset_aide: data.asset_aide || null,
        entity_aide: data.entity_aide || null,
        form_template_id: data.form_template_id || null,
        form_template: data.form_template || null,
        modified_at: data.modified_at || null,
        modified_by: data.modified_by || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await data_extract_template.setIntegratio_spec_id(
      data.integratio_spec_id || null,
      {
        transaction,
      },
    );

    return data_extract_template;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const data_extract_templateData = data.map((item, index) => ({
      id: item.id || undefined,

      asset_aide: item.asset_aide || null,
      entity_aide: item.entity_aide || null,
      form_template_id: item.form_template_id || null,
      form_template: item.form_template || null,
      modified_at: item.modified_at || null,
      modified_by: item.modified_by || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const data_extract_template = await db.data_extract_template.bulkCreate(
      data_extract_templateData,
      { transaction },
    );

    // For each item created, replace relation files

    return data_extract_template;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const data_extract_template = await db.data_extract_template.findByPk(
      id,
      {},
      { transaction },
    );

    await data_extract_template.update(
      {
        asset_aide: data.asset_aide || null,
        entity_aide: data.entity_aide || null,
        form_template_id: data.form_template_id || null,
        form_template: data.form_template || null,
        modified_at: data.modified_at || null,
        modified_by: data.modified_by || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await data_extract_template.setIntegratio_spec_id(
      data.integratio_spec_id || null,
      {
        transaction,
      },
    );

    return data_extract_template;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const data_extract_template = await db.data_extract_template.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of data_extract_template) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of data_extract_template) {
        await record.destroy({ transaction });
      }
    });

    return data_extract_template;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const data_extract_template = await db.data_extract_template.findByPk(
      id,
      options,
    );

    await data_extract_template.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await data_extract_template.destroy({
      transaction,
    });

    return data_extract_template;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const data_extract_template = await db.data_extract_template.findOne(
      { where },
      { transaction },
    );

    if (!data_extract_template) {
      return data_extract_template;
    }

    const output = data_extract_template.get({ plain: true });

    output.data_extract_request_form_template_id =
      await data_extract_template.getData_extract_request_form_template_id({
        transaction,
      });

    output.integratio_spec_id =
      await data_extract_template.getIntegratio_spec_id({
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
        model: db.data_extract_dag,
        as: 'integratio_spec_id',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.asset_aide) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'data_extract_template',
            'asset_aide',
            filter.asset_aide,
          ),
        };
      }

      if (filter.entity_aide) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'data_extract_template',
            'entity_aide',
            filter.entity_aide,
          ),
        };
      }

      if (filter.form_template) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'data_extract_template',
            'form_template',
            filter.form_template,
          ),
        };
      }

      if (filter.modified_by) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'data_extract_template',
            'modified_by',
            filter.modified_by,
          ),
        };
      }

      if (filter.form_template_idRange) {
        const [start, end] = filter.form_template_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            form_template_id: {
              ...where.form_template_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            form_template_id: {
              ...where.form_template_id,
              [Op.lte]: end,
            },
          };
        }
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

      if (filter.integratio_spec_id) {
        const listItems = filter.integratio_spec_id.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          integratio_spec_idId: { [Op.or]: listItems },
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
          count: await db.data_extract_template.count({
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
      : await db.data_extract_template.findAndCountAll({
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
          Utils.ilike('data_extract_template', 'id', query),
        ],
      };
    }

    const records = await db.data_extract_template.findAll({
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
