const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const data_asset_entity_map = sequelize.define(
    'data_asset_entity_map',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      modified_at: {
        type: DataTypes.DATE,
      },

      modified_by: {
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

  data_asset_entity_map.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.data_asset_entity_map.belongsTo(db.data_asset_info, {
      as: 'asset_aide',
      foreignKey: {
        name: 'asset_aideId',
      },
      constraints: false,
    });

    db.data_asset_entity_map.belongsTo(db.entity_info, {
      as: 'entity_aide',
      foreignKey: {
        name: 'entity_aideId',
      },
      constraints: false,
    });

    db.data_asset_entity_map.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.data_asset_entity_map.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return data_asset_entity_map;
};
