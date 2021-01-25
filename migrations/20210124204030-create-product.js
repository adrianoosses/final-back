'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sellerId: {
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      mainImage: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DOUBLE
      },
      sellDate: {
        type: Sequelize.DATE
      },
      productStatus: {
        type: Sequelize.ENUM('New', 'Used')
      },
      category: {
        type: Sequelize.ENUM('Book', 'Multimedia', 'Videogame', 'Home', 'Fashion', 'Vehicle')
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
    await queryInterface.dropTable('Products');
  }
};