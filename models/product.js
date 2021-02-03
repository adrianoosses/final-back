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
      this.hasMany(models.Image);
    }
  };
  Product.init({
    sellerId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    mainImage: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    sellDate: DataTypes.DATE,
    productStatus: DataTypes.ENUM('New', 'Used'),
    category: DataTypes.ENUM('Book', 'Multimedia', 'Videogame', 'Home', 'Fashion', 'Vehicle')
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};