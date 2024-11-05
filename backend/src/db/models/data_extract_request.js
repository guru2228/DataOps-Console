const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const data_extract_request = sequelize.define(
    'data_extract_request',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      form_values: {
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

  data_extract_request.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.data_extract_request.belongsTo(db.data_extract_template, {
      as: 'form_template_id',
      foreignKey: {
        name: 'form_template_idId',
      },
      constraints: false,
    });

    db.data_extract_request.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.data_extract_request.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return data_extract_request;
};
