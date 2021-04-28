"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {

  class users extends Model {

    static associate(models) {
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      nickname: DataTypes.STRING,
      profigle_image: DataTypes.STRING,
      room_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user',
    }
  );
  return users;
};
