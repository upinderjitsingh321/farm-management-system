'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users_farms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users_farms.belongsTo(models.users, { foreignKey: "user_farm_id" });
      users_farms.hasMany(models.field_list, { foreignKey: "farm_id" });

    }
  }
  users_farms.init({
   
    user_farm_id:DataTypes.STRING,
    created: DataTypes.STRING,
    // year: DataTypes.INTEGER,
    // farms: DataTypes.STRING,
    // area: DataTypes.STRING,
    // fields: DataTypes.STRING,
    // expenditure: DataTypes.STRING,
    // profit: DataTypes.STRING,
    // type: DataTypes.STRING,
    is_organic:DataTypes.BOOLEAN,
    owner: DataTypes.STRING,
    farm_name: DataTypes.STRING,
    farm_id: DataTypes.STRING,
     
  }, {
    sequelize,
    modelName: 'users_farms',
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return users_farms;
};