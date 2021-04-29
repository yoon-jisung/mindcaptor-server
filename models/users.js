"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {

  class users extends Model {

    static associate(models) {
      users.belongsTo(models.images, {foreignKey: 'profile_image', targetKey: 'id'});
      users.belongsTo(models.rooms, {foreignKey: 'room_id', targetKey: 'id'});
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      profigle_image: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'users',
    }
  );
  return users;
};
