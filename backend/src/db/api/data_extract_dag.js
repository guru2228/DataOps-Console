const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Data_extract_dagDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const data_extract_dag = await db.data_extract_dag.create(
      {
        id: data.id || undefined,

        integratio_spec_id: data.integratio_spec_id || null,
        dag_pipeline: data.dag_pipeline || null,
        modified_at: data.modified_at || null,
        modified_by: data.modified_by || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return data_extract_dag;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const data_extract_dagData = data.map((item, index) => ({
      id: item.id || undefined,

      integratio_spec_id: item.integratio_spec_id || null,
      dag_pipeline: item.dag_pipeline || null,
      modified_at: item.modified_at || null,
      modified_by: item.modified_by || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const data_extract_dag = await db.data_extract_dag.bulkCreate(
      data_extract_dagData,
      { transaction },
    );

    // For each item created, replace relation files

    return data_extract_dag;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const data_extract_dag = await db.data_extract_dag.findByPk(
      id,
      {},
      { transaction },
    );

    await data_extract_dag.update(
      {
        integratio_spec_id: data.integratio_spec_id || null,
        dag_pipeline: data.dag_pipeline || null,
        modified_at: data.modified_at || null,
        modified_by: data.modified_by || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return data_extract_dag;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const data_extract_dag = await db.data_extract_dag.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of data_extract_dag) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of data_extract_dag) {
        await record.destroy({ transaction });
      }
    });

    return data_extract_dag;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const data_extract_dag = await db.data_extract_dag.findByPk(id, options);

    await data_extract_dag.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await data_extract_dag.destroy({
      transaction,
    });

    return data_extract_dag;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const data_extract_dag = await db.data_extract_dag.findOne(
      { where },
      { transaction },
    );

    if (!data_extract_dag) {
      return data_extract_dag;
    }

    const output = data_extract_dag.get({ plain: true });

    output.data_extract_template_integratio_spec_id =
      await data_extract_dag.getData_extract_template_integratio_spec_id({
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

      if (filter.dag_pipeline) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'data_extract_dag',
            'dag_pipeline',
            filter.dag_pipeline,
          ),
        };
      }

      if (filter.modified_by) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'data_extract_dag',
            'modified_by',
            filter.modified_by,
          ),
        };
      }

      if (filter.integratio_spec_idRange) {
        const [start, end] = filter.integratio_spec_idRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            integratio_spec_id: {
              ...where.integratio_spec_id,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            integratio_spec_id: {
              ...where.integratio_spec_id,
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
          count: await db.data_extract_dag.count({
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
      : await db.data_extract_dag.findAndCountAll({
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
          Utils.ilike('data_extract_dag', 'id', query),
        ],
      };
    }

    const records = await db.data_extract_dag.findAll({
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
