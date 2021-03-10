const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserScore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userSend' });
      this.belongsTo(models.User, { foreignKey: 'userReceive' });
    }
  }
  UserScore.init({
    userSend: DataTypes.INTEGER,
    userReceive: DataTypes.INTEGER,
    uScore: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'UserScore',
  });
  return UserScore;
};
