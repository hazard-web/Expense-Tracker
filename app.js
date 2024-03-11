const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.get('/addExpense', (req, res, next) => {
    res.sendFile(path.join(__dirname,'public', 'views', 'expense.html'))
});

const PORT = 4000;

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});