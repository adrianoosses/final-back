'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Movement.init({
    buyerId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    movementDate: DataTypes.DATE,
    action: DataTypes.ENUM('Buy', 'Sell')
  }, {
    sequelize,
    modelName: 'Movement',
  });
  return Movement;
};