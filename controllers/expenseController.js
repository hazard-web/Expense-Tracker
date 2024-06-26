const path = require("path");
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");
const sequelize = require("../util/database");

exports.getHomePage = async (req, res, next) => {
  try {
    res.sendFile(
      path.join(__dirname, "../", "public", "views", "homePage.html")
    );
  } catch {
    (err) => console.log(err);
  }
};
exports.addExpense = async (req, res, next) => {
  const t = await sequelize.transaction();
  try {
    const date = req.body.date;
    const category = req.body.category;
    const description = req.body.description;
    const amount = req.body.amount;

    console.log('Request Body:', req.body);
    console.log('User', req.user);

    const parts = date.split('-');
    let validDate;
    if(parts.length === 3){
      const formateDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      validDate = new Date(formateDate);
    }else{
      validDate = new Date(date);
    }
    if(isNaN(validDate.getTime())){
      console.log('Invalid date format:', date);
      await t.rollback();
      return res.status(400).send({ error: 'Invalid date format' });
    }

    console.log('Valid Date', validDate);
    console.log('Starting user update for user id:', req.user.id);

    await User.update(
      {
        totalExpenses: req.user.totalExpenses + Number(amount),
      },
      { where: { id: req.user.id } },
      { transaction: t }
    );

    await Expense.create(
      {
        date: validDate,
        category: category,
        description: description,
        amount: amount,
        userId: req.user.id,
      },
      { transaction: t }
    )
      .then((result) => {
        res.status(200);
        res.redirect("/homePage");
      })
      .catch((err) => {
        console.log(err);
      });

    await t.commit();

  } catch {
    async (err) => {
      await t.rollback();
      console.log(err);
    };
  }
};
exports.getAllExpensesforPagination = async (req, res, next) => {
  try {
    const pageNo = req.params.page;
    const limit = 10;
    const offset = (pageNo - 1) * limit;
    const totalExpenses = await Expense.count({
      where: { userId: req.user.id },
    });
    const totalPages = Math.ceil(totalExpenses / limit);
    const expenses = await Expense.findAll({
      where: { userId: req.user.id },
      offset: offset,
      limit: limit,
    });
    res.json({ expenses: expenses, totalPages: totalPages });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  const id = req.params.id;
  try {
    const expense = await Expense.findByPk(id);
    await User.update(
      {
        totalExpenses: req.user.totalExpenses - expense.amount,
      },
      { where: { id: req.user.id } }
    );
    await Expense.destroy({ where: { id: id, userId: req.user.id } });
    res.redirect("/homePage");
  } catch (err) {
    console.log(err);
  }
};
exports.editExpense = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(req.body);
    const category = req.body.category;
    const description = req.body.description;
    const amount = req.body.amount;
    const expense = await Expense.findByPk(id);
    await User.update(
      {
        totalExpenses: req.user.totalExpenses - expense.amount + Number(amount),
      },
      { where: { id: req.user.id } }
    );
    await Expense.update(
      {
        category: category,
        description: description,
        amount: amount,
      },
      { where: { id: id, userId: req.user.id } }
    );
    res.redirect("/homePage");
  } catch (err) {
    console.log(err);
  }
};