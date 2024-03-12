const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense');


router.get('/addExpense', expenseController.getAddExpensePage);
router.get('/addExpense', expenseController.getAddExpense);
router.post('/addExpense', expenseController.postAddExpense);



module.exports = router;    