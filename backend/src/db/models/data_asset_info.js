const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const data_asset_info = sequelize.define(
    'data_asset_info',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      aide: {
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

  data_asset_info.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.data_asset_info.hasMany(db.contact_info, {
      as: 'contact_info_aide',
      foreignKey: {
        name: 'aideId',
      },
      constraints: false,
    });

    db.data_asset_info.hasMany(db.data_asset_entity_map, {
      as: 'data_asset_entity_map_asset_aide',
      foreignKey: {
        name: 'asset_aideId',
      },
      constraints: false,
    });

    db.data_asset_info.hasMany(db.data_asset_type, {
      as: 'data_asset_type_aide',
      foreignKey: {
        name: 'aideId',
      },
      constraints: false,
    });

    //end loop

    db.data_asset_info.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.data_asset_info.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return data_asset_info;
};
