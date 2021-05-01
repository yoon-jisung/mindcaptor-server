'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./users')(sequelize,Sequelize);
//db.followlist = require('./followlist')(sequelize,Sequelize);
db.images = require('./images')(sequelize,Sequelize);
db.rooms = require('./rooms')(sequelize,Sequelize);
db.guests= require('./guests')(sequelize,Sequelize);

db.users.belongsTo(db.images, {foreignKey: 'profile_image', targetKey: 'id'});
db.images.hasMany(db.users,{foreignKey:'profile_image',sourceKey:'id'})

db.guests.belongsTo(db.rooms, {foreignKey: 'room_id', targetKey: 'id'})
db.users.belongsTo(db.rooms, {foreignKey: 'room_id', targetKey: 'id'});
db.rooms.hasMany(db.users,{foreignKey:'room_id',sourceKey:'id'})
db.rooms.hasMany(db.guests,{foreignKey:'room_id',sourceKey:'id'})

const followlist = sequelize.define('followlist',{
  following_id:{
    type: DataTypes.INTEGER,
    references: {
      model: db.users, 
      key: 'id'
    }
  },
  followed_id:{
    type: DataTypes.INTEGER,
    references: {
      model: db.users, 
      key: 'id'
    }
  }
})

db.users.belongsToMany(db.users, {through: 'followlist',as: 'following'})
db.users.belongsToMany(db.users, {through: 'followlist',as: 'followed'})

module.exports = db;