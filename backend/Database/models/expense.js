'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class expense extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  expense.init({
    crop: DataTypes.STRING,
    fertilizer: DataTypes.STRING,
    herbic: DataTypes.STRING,
    pesticide: DataTypes.STRING,
    fungicide: DataTypes.STRING,
    manure: DataTypes.STRING,
    labour_cost: DataTypes.STRING,
    activities: DataTypes.STRING,
    other_cost: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'expense',
  });
  return expense;
};