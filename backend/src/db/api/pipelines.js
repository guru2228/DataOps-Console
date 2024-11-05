const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PipelinesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pipelines = await db.pipelines.create(
      {
        id: data.id || undefined,

        pipeline_spec: data.pipeline_spec || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await pipelines.setClient_org(data.client_org || null, {
      transaction,
    });

    await pipelines.setSteps(data.steps || [], {
      transaction,
    });

    return pipelines;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const pipelinesData = data.map((item, index) => ({
      id: item.id || undefined,

      pipeline_spec: item.pipeline_spec || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const pipelines = await db.pipelines.bulkCreate(pipelinesData, {
      transaction,
    });

    // For each item created, replace relation files

    return pipelines;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const globalAccess = currentUser.app_role?.globalAccess;

    const pipelines = await db.pipelines.findByPk(id, {}, { transaction });

    await pipelines.update(
      {
        pipeline_spec: data.pipeline_spec || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await pipelines.setClient_org(data.client_org || null, {
      transaction,
    });

    await pipelines.setSteps(data.steps || [], {
      transaction,
    });

    return pipelines;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pipelines = await db.pipelines.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of pipelines) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of pipelines) {
        await record.destroy({ transaction });
      }
    });

    return pipelines;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const pipelines = await db.pipelines.findByPk(id, options);

    await pipelines.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await pipelines.destroy({
      transaction,
    });

    return pipelines;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const pipelines = await db.pipelines.findOne({ where }, { transaction });

    if (!pipelines) {
      return pipelines;
    }

    const output = pipelines.get({ plain: true });

    output.steps = await pipelines.getSteps({
      transaction,
    });

    output.client_org = await pipelines.getClient_org({
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

      {
        model: db.pipeline_steps,
        as: 'steps',
        through: filter.steps
          ? {
              where: {
                [Op.or]: filter.steps.split('|').map((item) => {
                  return { ['Id']: Utils.uuid(item) };
                }),
              },
            }
          : null,
        required: filter.steps ? true : null,
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.pipeline_spec) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'pipelines',
            'pipeline_spec',
            filter.pipeline_spec,
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
          count: await db.pipelines.count({
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
      : await db.pipelines.findAndCountAll({
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
          Utils.ilike('pipelines', 'pipeline_spec', query),
        ],
      };
    }

    const records = await db.pipelines.findAll({
      attributes: ['id', 'pipeline_spec'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['pipeline_spec', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.pipeline_spec,
    }));
  }
};
