'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class followings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      followings.belongsToMany(models.users, {foreignKey: 'following_id', targetKey: 'id'});
      followings.belongsToMany(models.users, {foreignKey: 'followed_id', targetKey: 'id'});
    }
  };
  followings.init({
    following_id: DataTypes.INTEGER,
    followed_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'followings',
  });
  return followings;
};