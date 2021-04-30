'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //users.belongsTo(models.images, {foreignKey: 'profile_image', targetKey: 'id'});
      users.belongsTo(models.rooms, {foreignKey: 'room_id', targetKey: 'id'});
      users.belongsToMany(models.users, {through: 'followlist'})
      //,foreignKey: 'following_id'})
      //users.belongsToMany(models.users, {through: 'followlist',foreignKey: 'ffollowed_id'})

    }
  };
  users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    profile_image: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};