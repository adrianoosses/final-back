'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User);
    }
  };
  Product.init({
    buyerId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    sellDate: DataTypes.DATE,
    productStatus: DataTypes.ENUM('New', 'Used')
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};