const express = require('express');
const router = express.Router();

const expenseController = require('../controllers/expense');
const userAuthenticate = require('../middleware/auth');


router.get('/addExpensePage', expenseController.getAddExpensePage);
router.get('/addExpense', userAuthenticate.authenticate, expenseController.getAddExpense);
router.post('/addExpensePage', expenseController.postAddExpense);
router.delete('/deleteExpense/:id', expenseController.postDeleteExpense);



module.exports = router;    