require('dotenv').config();
const { Sequelize } = require('sequelize');

// Load environment variables
const sequelize = new Sequelize(
  process.env.DB_NAME,   // Database name
  process.env.DB_USER,   // Database username
  process.env.DB_PASS,   // Database password
  {
    host: process.env.DB_HOST,   // Database host
    dialect: process.env.DB_DIALECT, // Database dialect (e.g., mysql)
    logging: false,  // Disable SQL logging
  }
);

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('✅ Database connected successfully'))
  .catch(err => console.error('❌ Database connection failed:', err));

module.exports = sequelize;
 