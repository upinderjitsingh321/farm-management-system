'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class crop_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      crop_list.belongsTo(models.field_list, { foreignKey: "field_id" });
      crop_list.hasMany(models.activity, { foreignKey: "field_id" });
      crop_list.hasMany(models.inputs, { foreignKey: "field_id" });

    }
  }
  crop_list.init({
    field_id: DataTypes.INTEGER,
    field: DataTypes.STRING,
    crop: DataTypes.STRING,
    acre: DataTypes.STRING,
    variety: DataTypes.STRING,
    snowing_mth: DataTypes.STRING,
    irrigation_mth: DataTypes.STRING,
    production: DataTypes.STRING,
    note: DataTypes.STRING,
    planting : DataTypes.DATEONLY,
    harvest: DataTypes.DATEONLY,
    price: DataTypes.STRING,
    fertilizer: DataTypes.STRING,
    herbicide: DataTypes.STRING,
    organic: DataTypes.STRING,
    insecticide: DataTypes.STRING,
    fungicide: DataTypes.STRING,
    activity: DataTypes.STRING,
    production: DataTypes.STRING,
    labour: DataTypes.STRING,
    previous_crop: DataTypes.STRING,
    season: DataTypes.STRING,
    season_year: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'crop_list',
    tableName: 'crop_list',
    paranoid:true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return crop_list;
};