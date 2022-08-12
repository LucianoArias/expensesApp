const express = require('express');
const expenseController = require('../controllers/expenseController');

const router = express.Router();
router.post('/expense', expenseController.expenses_post);
router.delete('/expense/delete/:expenseId', expenseController.expense_delete);
router.get('/expenses', expenseController.expenses_get);

module.exports = router;
