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
        const token = req.header('Authentication');
        const decoded = jwt.verify(token, 'secretkey');
        const userId = decoded.userId;

        const expenses = await Expense.findAll({
            where: {
                userId: userId
            }
        })
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
        const token = req.header('Authentication');
        const decoded = jwt.verify(token,'secretkey');
        const userId = decoded.userId;

        await Expense.create({
            description: expense.description,
            amount: expense.amount,
            category: expense.category,
            userId : userId
        });
        res.redirect('/addExpensePage');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add expense' });
    }
};


exports.postDeleteExpense = async (req, res, next) => {
    try {
        const token = req.header('Authentication');
        const decoded = jwt.verify(token,'secretkey');
        const userId = decoded.userId;
        
        const expenseId = req.params.id;
        const deletedExpense = await Expense.findByPk(expenseId);

        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        if (deletedExpense.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized to delete this message '});
        }

        await Expense.destroy();
        res.status(200).json({ message: 'Expense Deleted Successfully' });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete expense' });
    }
};


