const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const cli_org_grp = sequelize.define(
    'cli_org_grp',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      start_dttm: {
        type: DataTypes.DATE,
      },

      end_dttm: {
        type: DataTypes.DATE,
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

  cli_org_grp.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.cli_org_grp.belongsTo(db.cli_org, {
      as: 'cli_org_grp_id',
      foreignKey: {
        name: 'cli_org_grp_idId',
      },
      constraints: false,
    });

    db.cli_org_grp.belongsTo(db.cli_org, {
      as: 'cli_org_id',
      foreignKey: {
        name: 'cli_org_idId',
      },
      constraints: false,
    });

    db.cli_org_grp.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.cli_org_grp.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return cli_org_grp;
};
