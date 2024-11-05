const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const cli_org_admins = sequelize.define(
    'cli_org_admins',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
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

  cli_org_admins.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.cli_org_admins.belongsTo(db.cli_org, {
      as: 'cli_org_id',
      foreignKey: {
        name: 'cli_org_idId',
      },
      constraints: false,
    });

    db.cli_org_admins.belongsTo(db.users, {
      as: 'user_id',
      foreignKey: {
        name: 'user_idId',
      },
      constraints: false,
    });

    db.cli_org_admins.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.cli_org_admins.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return cli_org_admins;
};
