const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'source' });
      // this.belongsTo(models.User, {foreignKey: 'destination'});
    }
  }
  Chat.init({
    source: DataTypes.INTEGER,
    destination: DataTypes.INTEGER,
    chatDate: DataTypes.DATE,
    message: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};
