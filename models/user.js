const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,      //varchar(225)
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,     //varchar(225)
        allowNull: false,
        unique: true              //email must be unique
    },
    password: {
        type: Sequelize.STRING,     //varchar(45)
        allowNull: false
    }
   
});

module.exports = User;