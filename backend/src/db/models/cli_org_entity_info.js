const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const cli_org_entity_info = sequelize.define(
    'cli_org_entity_info',
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

  cli_org_entity_info.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.cli_org_entity_info.belongsTo(db.cli_org, {
      as: 'cli_org_aide',
      foreignKey: {
        name: 'cli_org_aideId',
      },
      constraints: false,
    });

    db.cli_org_entity_info.belongsTo(db.entity_info, {
      as: 'entity_info_aide',
      foreignKey: {
        name: 'entity_info_aideId',
      },
      constraints: false,
    });

    db.cli_org_entity_info.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.cli_org_entity_info.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return cli_org_entity_info;
};
