const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const connectors = sequelize.define(
    'connectors',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      connector_spec: {
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

  connectors.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.connectors.belongsTo(db.client_orgs, {
      as: 'client_org',
      foreignKey: {
        name: 'client_orgId',
      },
      constraints: false,
    });

    db.connectors.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.connectors.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return connectors;
};
