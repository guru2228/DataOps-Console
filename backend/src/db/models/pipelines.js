const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const pipelines = sequelize.define(
    'pipelines',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      pipeline_spec: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  pipelines.associate = (db) => {
    db.pipelines.belongsToMany(db.pipeline_steps, {
      as: 'steps',
      foreignKey: {
        name: 'pipelines_stepsId',
      },
      constraints: false,
      through: 'pipelinesStepsPipeline_steps',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.pipelines.belongsTo(db.client_orgs, {
      as: 'client_org',
      foreignKey: {
        name: 'client_orgId',
      },
      constraints: false,
    });

    db.pipelines.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.pipelines.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return pipelines;
};
