const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const data_extract_dag = sequelize.define(
    'data_extract_dag',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      integratio_spec_id: {
        type: DataTypes.INTEGER,
      },

      dag_pipeline: {
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

  data_extract_dag.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.data_extract_dag.hasMany(db.data_extract_template, {
      as: 'data_extract_template_integratio_spec_id',
      foreignKey: {
        name: 'integratio_spec_idId',
      },
      constraints: false,
    });

    //end loop

    db.data_extract_dag.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.data_extract_dag.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return data_extract_dag;
};
