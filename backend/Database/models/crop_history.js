'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class crop_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  crop_history.init({
    fields: DataTypes.STRING,
    year: DataTypes.STRING,
    acre: DataTypes.STRING,
    crops: DataTypes.STRING,
    year1: DataTypes.STRING,
    year2: DataTypes.STRING,
    year3: DataTypes.STRING,
    year4: DataTypes.STRING,
    year5: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'crop_history',
  });
  return crop_history;
};