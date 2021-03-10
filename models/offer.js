const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Offer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, { foreignKey: 'productId' });
      this.belongsTo(models.User, { foreignKey: 'sellerId' });
    }
  }
  Offer.init({
    sellerId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    offerValue: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};
