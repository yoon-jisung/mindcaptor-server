"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {

  class guests extends Model {

    static associate(models) {
      guests.belongsTo(models.rooms, {foreignKey: 'room_id', targetKey: 'id'});
    }
  }
  guests.init(
    {
      room_name: DataTypes.STRING,
      room_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'guests',
    }
  );
  return guests;
};
