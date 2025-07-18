'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class four_year_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  four_year_data.init({
    crops: DataTypes.STRING,
    production: DataTypes.STRING,
    year1: DataTypes.STRING,
    year2: DataTypes.STRING,
    year3: DataTypes.STRING,
    year4: DataTypes.STRING,
    year5: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'four_year_data',
  });
  return four_year_data;
};