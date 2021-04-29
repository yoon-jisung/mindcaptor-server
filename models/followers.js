'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class followers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.belongsToMany(models.images, {foreignKey: 'profile_image', targetKey: 'id'});
      users.belongsToMany(models.rooms, {foreignKey: 'room_id', targetKey: 'id'});
    }
  };
  followers.init({
    following_id: DataTypes.INTEGER,
    followed_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'followers',
  });
  return followers;
};