const Sequelize = require("sequelize");
const dotenv = require("dotenv");
require('dotenv').config();

const sequelize = new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD,{
    dialect: "mysql",
    host: process.env.SQL_HOST,
});

// Test connection
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection();

module.exports = sequelize;