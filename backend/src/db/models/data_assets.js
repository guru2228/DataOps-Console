const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const data_assets = sequelize.define(
    'data_assets',
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

  data_assets.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.data_assets.belongsTo(db.users, {
      as: 'owner',
      foreignKey: {
        name: 'ownerId',
      },
      constraints: false,
    });

    db.data_assets.belongsTo(db.client_orgs, {
      as: 'client_org',
      foreignKey: {
        name: 'client_orgId',
      },
      constraints: false,
    });

    db.data_assets.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.data_assets.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return data_assets;
};
