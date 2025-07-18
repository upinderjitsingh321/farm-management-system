'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class nutrient_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      nutrient_list.belongsTo(models.field_list, { foreignKey: "nutrient_id" });

    }
  }
  nutrient_list.init({
    nutrient_id: DataTypes.INTEGER,
    field_no:DataTypes.STRING,
    n: DataTypes.STRING,
    p: DataTypes.STRING,
    k: DataTypes.STRING,
    ca: DataTypes.STRING,
    mg: DataTypes.STRING,
    s: DataTypes.STRING,
    fe: DataTypes.STRING,
    mn: DataTypes.STRING,
    zn: DataTypes.STRING,
    cu: DataTypes.STRING,
    cl: DataTypes.STRING,
    b: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'nutrient_list',
    tableName: 'nutrient_list',
    paranoid:true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return nutrient_list;
};