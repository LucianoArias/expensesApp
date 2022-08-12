const { prisma } = require('../constats/config.js');
const { DateTime } = require('luxon');

const categories_get = async (req, res) => {
  if (req.session.userId) {
    let ctgs;
    try {
      ctgs = await prisma.expenseCategory
        .findMany()
        .catch(() => console.log('err'));

      if (ctgs) res.status(200).send(ctgs);
    } catch {
      res.status(400).send('error');
    }
  } else res.status(401).send('please login');
};

const categories_expense_sum = async (req, res) => {
  if (req.session.userId) {
    let firstDate = req.query.first;
    let lastDate = DateTime.now().toISO();

    if (!firstDate) {
      firstDate = DateTime.now().minus({ month: 1 }).toISO();
    }

    try {
      const expenses = await prisma.expense.groupBy({
        by: ['expenseCategoryId'],
        _sum: {
          money: true,
        },
        where: {
          wallet: {
            userId: req.session.userId,
          },
          date: {
            gte: firstDate,
            lt: lastDate,
          },
        },
      });
      res.send(expenses);
    } catch {
      res.status(400).send('Err');
    }
  }
};

module.exports = {
  categories_get,
  categories_expense_sum,
};
