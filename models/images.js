'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class images extends Model {
        static associate(models) {
            images.hasMany(models.users,{foreignKey:'profile_image',sourceKey:'id'})
        }
    }
    images.init(
        {
            images: DataTypes.BLOB('tiny'),
        },
        {
            sequelize,
            modelName: 'images',
        }
    );
    return images;
};