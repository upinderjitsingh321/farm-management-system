'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class soil_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      soil_list.belongsTo(models.field_list, { foreignKey: "soil_id" });

    }
  }
  soil_list.init({
    soil_id: DataTypes.INTEGER,
    field_no: DataTypes.STRING,
    soiltype: DataTypes.STRING,
    issue: DataTypes.STRING,
    o_matter: DataTypes.STRING,
    e_conductivity: DataTypes.STRING,
    s_salinity: DataTypes.STRING,
    s_texture: DataTypes.STRING,
    s_ph: DataTypes.STRING,
    moistureValue: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'soil_list',
    tableName: 'soil_list',
    paranoid:true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return soil_list;
};