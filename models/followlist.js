'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class followlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  followlist.init({
    following_id: DataTypes.STRING,
    followed_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'followlist',
  });
  return followlist;
};