const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const payload_record_spec = sequelize.define(
    'payload_record_spec',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      payload_record_spec_id: {
        type: DataTypes.INTEGER,
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

  payload_record_spec.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.payload_record_spec.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.payload_record_spec.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return payload_record_spec;
};
