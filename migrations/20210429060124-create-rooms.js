'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rooms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      room_pw: {
        type: Sequelize.STRING
      },
      room_name: {
        type: Sequelize.STRING
      },
      limit_time: {
        type: Sequelize.INTEGER
      },
      answer: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('rooms');
  }
};