'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      activity.belongsTo(models.crop_list, { foreignKey: "field_id" });
    }
  }
  activity.init({
    field_id:DataTypes.INTEGER,
    field_no:DataTypes.STRING,
    farm_id:DataTypes.STRING,
    activity_name: DataTypes.STRING,
    rate: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY,
    note: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'activity',
    tableName:'activity',
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  });
  return activity;
};

// S!NGHs11b