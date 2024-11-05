const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const integrations = sequelize.define(
    'integrations',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      integration_name: {
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

  integrations.associate = (db) => {
    db.integrations.belongsToMany(db.connectors, {
      as: 'connectors',
      foreignKey: {
        name: 'integrations_connectorsId',
      },
      constraints: false,
      through: 'integrationsConnectorsConnectors',
    });

    db.integrations.belongsToMany(db.pipelines, {
      as: 'pipelines',
      foreignKey: {
        name: 'integrations_pipelinesId',
      },
      constraints: false,
      through: 'integrationsPipelinesPipelines',
    });

    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.integrations.belongsTo(db.client_orgs, {
      as: 'client_org',
      foreignKey: {
        name: 'client_orgId',
      },
      constraints: false,
    });

    db.integrations.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.integrations.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return integrations;
};
