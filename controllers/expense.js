const Expense = require('../models/expense');
const path = require('path');


exports.getAddExpensePage = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'views', 'expense.html'));
    } catch (err) {
        next(err);
    }
}

exports.getAddExpense = async (req, res, next) => {
    try {
        const expenses = await Expense.findAll();
        res.status(200).json({ allExpenses: expenses })
    } catch (err) {
        res.status(500).json({ error: err });
        console.log(err);
    }
}

exports.postAddExpense = async (req, res, next) => {
    let expense = {
        description: req.body.description,
        amount: req.body.amount,
        category: req.body.category
    };

    try {
        Expense.create({
            description: expense.description,
            amount: expense.amount,
            category: expense.category
        });
        res.redirect('/addExpensePage');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add expense' });
    }
};


exports.postDeleteExpense = async (req, res, next) => {
    try {
        const expenseId = req.params.id;
        const deletedExpense = await Expense.destroy({
            where: {
                id: expenseId
            }
        });
        res.status(200).json({ deletedExpense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};


