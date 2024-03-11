const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('./util/database');
const signUpRoutes = require('./routes/signUp');
const loginRoutes = require('./routes/login');
// const Cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(bodyParser.json());

app.use(signUpRoutes);
app.use(loginRoutes);
// app.use(Cors());

Sequelize.sync()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.error(err));


const PORT = 4000;

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});