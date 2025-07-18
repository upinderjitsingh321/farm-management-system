'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

// Initialize Sequelize with environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,     // Database name
  process.env.DB_USER,     // Database username
  process.env.DB_PASS,     // Database password
  {
    host: process.env.DB_HOST,      // Database host
    dialect: process.env.DB_DIALECT, // Database dialect (mysql, postgres, etc.)
    logging: false,  // Disable logging for cleaner console output
  }
);

// Read all models in the current directory and add them to `db`
fs.readdirSync(__dirname)
  .filter(file => 
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Apply model associations if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize; 

module.exports = db;
