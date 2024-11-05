const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const entity_info = sequelize.define(
    'entity_info',
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

  entity_info.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.entity_info.hasMany(db.cli_org_entity_info, {
      as: 'cli_org_entity_info_entity_info_aide',
      foreignKey: {
        name: 'entity_info_aideId',
      },
      constraints: false,
    });

    db.entity_info.hasMany(db.data_asset_entity_map, {
      as: 'data_asset_entity_map_entity_aide',
      foreignKey: {
        name: 'entity_aideId',
      },
      constraints: false,
    });

    //end loop

    db.entity_info.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.entity_info.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return entity_info;
};
