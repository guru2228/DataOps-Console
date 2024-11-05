const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const pipeline_steps = sequelize.define(
    'pipeline_steps',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      step_name: {
        type: DataTypes.TEXT,
      },

      step_type: {
        type: DataTypes.ENUM,

        values: ['Extract', 'Transform', 'Enrich', 'Load'],
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

  pipeline_steps.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.pipeline_steps.belongsTo(db.client_orgs, {
      as: 'client_org',
      foreignKey: {
        name: 'client_orgId',
      },
      constraints: false,
    });

    db.pipeline_steps.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.pipeline_steps.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return pipeline_steps;
};
