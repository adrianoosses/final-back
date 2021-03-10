const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, { foreignKey: 'sellerId' });
      this.hasMany(models.Offer, { foreignKey: 'sellerId' });
      this.hasMany(models.ProductFavorite, { foreignKey: 'userId' });
      this.hasMany(models.UserScore, { foreignKey: 'userSend' });
      this.hasMany(models.UserScore, { foreignKey: 'userReceive' });
      this.hasMany(models.Chat, { foreignKey: 'source' });
      // this.hasMany(models.Chat, {foreignKey: 'destination'});
    }
  }
  User.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('Admin', 'Client'),
    birthDate: DataTypes.DATE,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    card: DataTypes.BIGINT,
  }, {
    sequelize,
    timestamps: true,
    modelName: 'User',
  });
  return User;
};
