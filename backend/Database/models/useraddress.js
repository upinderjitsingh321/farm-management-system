'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class useraddresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      useraddresses.belongsTo(models.users, { foreignKey: "user_id" });

    }
  }
  useraddresses.init({
    user_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    state: DataTypes.STRING,
    district: DataTypes.STRING,
    block: DataTypes.STRING,
    city: DataTypes.STRING,
    pin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'useraddresses',
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return useraddresses;
};