const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const client_orgs = sequelize.define(
    'client_orgs',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
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

  client_orgs.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.client_orgs.hasMany(db.users, {
      as: 'users_client_org',
      foreignKey: {
        name: 'client_orgId',
      },
      constraints: false,
    });

    db.client_orgs.hasMany(db.connectors, {
      as: 'connectors_client_org',
      foreignKey: {
        name: 'client_orgId',
      },
      constraints: false,
    });

    db.client_orgs.hasMany(db.data_assets, {
      as: 'data_assets_client_org',
      foreignKey: {
        name: 'client_orgId',
      },
      constraints: false,
    });

    db.client_orgs.hasMany(db.integrations, {
      as: 'integrations_client_org',
      foreignKey: {
        name: 'client_orgId',
      },
      constraints: false,
    });

    db.client_orgs.hasMany(db.pipeline_steps, {
      as: 'pipeline_steps_client_org',
      foreignKey: {
        name: 'client_orgId',
      },
      constraints: false,
    });

    db.client_orgs.hasMany(db.pipelines, {
      as: 'pipelines_client_org',
      foreignKey: {
        name: 'client_orgId',
      },
      constraints: false,
    });

    //end loop

    db.client_orgs.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.client_orgs.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return client_orgs;
};
