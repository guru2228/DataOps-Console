const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const cli_org = sequelize.define(
    'cli_org',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      cli_org_id: {
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

  cli_org.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.cli_org.hasMany(db.cli_org_admins, {
      as: 'cli_org_admins_cli_org_id',
      foreignKey: {
        name: 'cli_org_idId',
      },
      constraints: false,
    });

    db.cli_org.hasMany(db.cli_org_entity_info, {
      as: 'cli_org_entity_info_cli_org_aide',
      foreignKey: {
        name: 'cli_org_aideId',
      },
      constraints: false,
    });

    db.cli_org.hasMany(db.cli_org_grp, {
      as: 'cli_org_grp_cli_org_grp_id',
      foreignKey: {
        name: 'cli_org_grp_idId',
      },
      constraints: false,
    });

    db.cli_org.hasMany(db.cli_org_grp, {
      as: 'cli_org_grp_cli_org_id',
      foreignKey: {
        name: 'cli_org_idId',
      },
      constraints: false,
    });

    //end loop

    db.cli_org.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.cli_org.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return cli_org;
};
