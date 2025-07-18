'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users_details.belongsTo(models.users, { foreignKey: "user_id" });

      // users_details.belongsTo(models.User, { foreignKey: "user_id" })
    }
  }
  users_details.init({
    name: DataTypes.STRING,
    number: DataTypes.STRING,
    relative_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    dob: DataTypes.DATEONLY,
   
  }, {
    sequelize,
    modelName: 'users_details',
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return users_details;
};