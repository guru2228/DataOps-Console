const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Pipeline_stepsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pipeline_steps = await db.pipeline_steps.create(
      {
        id: data.id || undefined,

        step_name: data.step_name || null,
        step_type: data.step_type || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await pipeline_steps.setClient_org(data.client_org || null, {
      transaction,
    });

    return pipeline_steps;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const pipeline_stepsData = data.map((item, index) => ({
      id: item.id || undefined,

      step_name: item.step_name || null,
      step_type: item.step_type || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const pipeline_steps = await db.pipeline_steps.bulkCreate(
      pipeline_stepsData,
      { transaction },
    );

    // For each item created, replace relation files

    return pipeline_steps;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const pipeline_steps = await db.pipeline_steps.findByPk(
      id,
      {},
      { transaction },
    );

    await pipeline_steps.update(
      {
        step_name: data.step_name || null,
        step_type: data.step_type || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await pipeline_steps.setClient_org(data.client_org || null, {
      transaction,
    });

    return pipeline_steps;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pipeline_steps = await db.pipeline_steps.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of pipeline_steps) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of pipeline_steps) {
        await record.destroy({ transaction });
      }
    });

    return pipeline_steps;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pipeline_steps = await db.pipeline_steps.findByPk(id, options);

    await pipeline_steps.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await pipeline_steps.destroy({
      transaction,
    });

    return pipeline_steps;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const pipeline_steps = await db.pipeline_steps.findOne(
      { where },
      { transaction },
    );

    if (!pipeline_steps) {
      return pipeline_steps;
    }

    const output = pipeline_steps.get({ plain: true });

    output.client_org = await pipeline_steps.getClient_org({
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

      if (filter.step_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pipeline_steps',
            'step_name',
            filter.step_name,
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

      if (filter.step_type) {
        where = {
          ...where,
          step_type: filter.step_type,
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
          count: await db.pipeline_steps.count({
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
      : await db.pipeline_steps.findAndCountAll({
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
          Utils.ilike('pipeline_steps', 'step_name', query),
        ],
      };
    }

    const records = await db.pipeline_steps.findAll({
      attributes: ['id', 'step_name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['step_name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.step_name,
    }));
  }
};
