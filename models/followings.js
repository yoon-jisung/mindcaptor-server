"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {

  class followings extends Model {

    static associate(models) {
      followings.belongsTo(models.users, {foreignKey: 'following_id', targetKey: 'id'});
      followings.belongsTo(models.users, {foreignKey: 'followed_id', targetKey: 'id'});
    }
  }
  followings.init(
    {
      following_id: DataTypes.INTEGER,
      followed_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'followings',
    }
  );
  return followings;
};
