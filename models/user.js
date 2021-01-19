'use strict';
const {
  Model
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
    }
  };
  User.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('Admin', 'Client'),
    birthDate: DataTypes.DATE,
    address: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    card: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};