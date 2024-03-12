const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Expense = sequelize.define('expense', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: Sequelize.TEXT,      
    },
    amount: {
        type: Sequelize.INTEGER,
    },
    category: {
        type: Sequelize.STRING,
    }
})

module.exports = Expense;