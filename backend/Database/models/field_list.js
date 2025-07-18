'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class field_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association 
      field_list.belongsTo(models.users_farms, { foreignKey: "farm_id" });
      field_list.hasMany(models.crop_list, { foreignKey: "field_id" });
      field_list.hasMany(models.soil_list, { foreignKey: "soil_id" });
      field_list.hasMany(models.nutrient_list, { foreignKey: "nutrient_id" });

    }
  }
  field_list.init({
   
   
      farm_id: DataTypes.INTEGER,
      farm_no: DataTypes.STRING,
    field_no: DataTypes.STRING,
    acre	: DataTypes.STRING,
    landownership	: DataTypes.STRING,
    khasra	: DataTypes.STRING,
    farmpractices	: DataTypes.STRING,
    status	: DataTypes.INTEGER,
    farm_name	: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'field_list',
    tableName: 'field_list',
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return field_list;
};