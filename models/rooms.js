'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rooms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      rooms.hasMany(models.users,{foreignKey:'room_id',sourceKey:'id'})
      rooms.hasMany(models.guests,{foreignKey:'room_id',sourceKey:'id'})

    }
  };
  rooms.init({
    room_pw: DataTypes.STRING,
    room_name: DataTypes.STRING,
    limit_time: DataTypes.INTEGER,
    answer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rooms',
  });
  return rooms;
};