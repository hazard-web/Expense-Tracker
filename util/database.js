const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  "expense",
  "root",
  "nodeintro",
  {
    dialect: "mysql",
    host: "localhost",
  }
);

module.exports = sequelize;