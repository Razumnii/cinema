const { DataTypes } = require('sequelize');

exports.init = dbManeger => {
  const Model = dbManeger.define('user', {
    firstName: {
      field: 'first_name',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      field: 'last_name',
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    hash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    hashVersion: {
      field: 'hash_version',
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roleId: {
      field: 'role_id',
      type: DataTypes.INTEGER,
    },
  });

  Model.link = () => {
    const { role: Role } = dbManeger.models;
    Model.belongsTo(Role, {
      foreignKey: 'roleId',
    });
  };

  return Model;
};
