"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {

  class rooms extends Model {

    static associate(models) {
    }
  }
  rooms.init(
    {
      room_pw: DataTypes.STRING,
      room_name: DataTypes.STRING,
      limit_time: DataTypes.INTEGER,
      room_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'rooms',
    }
  );
  return rooms;
};
