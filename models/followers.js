'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class followers extends Model {
        static associate(models) {
            followers.belongsTo(models.users, {
                foreignKey: 'following_id',
                targetKey: 'id',
            });
            followers.belongsTo(models.users, {
                foreignKey: 'followed_id',
                targetKey: 'id',
            });
        }
    }
    followers.init(
        {
            following_id: DataTypes.INTEGER,
            followed_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'followers',
        }
    );
    return followers;
};

