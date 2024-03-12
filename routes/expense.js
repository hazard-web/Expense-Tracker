const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense');


router.get('/addExpensePage', expenseController.getAddExpensePage);
router.get('/addExpense', expenseController.getAddExpense);
router.post('/addExpensePage', expenseController.postAddExpense);
router.delete('/deleteExpense/:id', expenseController.postDeleteExpense);



module.exports = router;    