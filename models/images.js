'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class images extends Model {
        static associate(models) {}
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
