const { DataTypes } = require('sequelize');

exports.init = dbManeger => {
  const Model = dbManeger.define('role', {
    name: {
      type: DataTypes.STRING,
    },
  });

  Model.link = () => {
    const { user: User } = dbManeger.models;

    Model.hasMany(User, {
      foreignKey: 'roleId',
    });
  };

  return Model;
};
