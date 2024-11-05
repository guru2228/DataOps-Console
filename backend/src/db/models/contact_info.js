const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const contact_info = sequelize.define(
    'contact_info',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      type: {
        type: DataTypes.TEXT,
      },

      role: {
        type: DataTypes.TEXT,
      },

      val: {
        type: DataTypes.TEXT,
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

  contact_info.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.contact_info.belongsTo(db.data_asset_info, {
      as: 'aide',
      foreignKey: {
        name: 'aideId',
      },
      constraints: false,
    });

    db.contact_info.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.contact_info.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return contact_info;
};
