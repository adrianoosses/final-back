'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movements', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      buyerId: {
        type: Sequelize.INTEGER
      },
      sellerId: {
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      movementDate: {
        type: Sequelize.DATE
      },
      action: {
        type: Sequelize.ENUM('Buy', 'Sell')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movements');
  }
};