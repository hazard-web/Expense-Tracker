const express = require("express");
const app = express();

const bodyParser = require("body-parser");

const dotenv = require("dotenv");

const cors = require('cors');

dotenv.config();

const sequelize = require("./util/database");

const userRouter = require("./router/userRouter");
const expenseRouter = require("./router/expenseRouter");
const purchaseMembershipRouter = require("./router/purchaseMembershipRouter");
const leaderboardRouter = require("./router/leaderboardRouter");

const User = require("./models/userModel");
const Expense = require("./models/expenseModel");
const Order = require("./models/ordersModel");

app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


try {
  app.use("/", userRouter);
  app.use("/user", userRouter);
  app.use("/homePage", expenseRouter);
  app.use("/expense", expenseRouter);

  app.use("/purchase", purchaseMembershipRouter);

  app.use("/premium", leaderboardRouter);

} catch (error) {
  console.error('Error in setting up routers: ', error.message)
}


User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);


sequelize
  .sync()
  .then((result) => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => console.log(err));