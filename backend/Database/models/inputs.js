'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inputs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      inputs.belongsTo(models.crop_list, { foreignKey: "field_id" });

    }
  }
  inputs.init({
    field_id: DataTypes.INTEGER,
    field_no: DataTypes.STRING,
    name: DataTypes.STRING,
    rate: DataTypes.STRING,
    period: DataTypes.STRING,
    dosage: DataTypes.STRING,
    date: DataTypes.DATEONLY,
    inputname: DataTypes.STRING,
    manufacture_com: DataTypes.STRING,
    note: DataTypes.STRING,
    active_ing:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'inputs',
    tableName:'inputs',
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return inputs;
};