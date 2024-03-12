const User = require('../models/user');
const path = require('path');


exports.getLoginPage = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'views', 'login.html'))
    } catch (error) {
        next(error);
    }
};

exports.postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        const user = await User.findOne({ where: { email: email } });

        if (user) {
            if (password === user.password) {
                // res.status(200).json({ message: 'User login successful' });
                res.redirect('/addExpensePage');
            } else {
                res.status(400).json({ message: 'Invalid password' });
            }
        } else {
            res.status(401).json({ message: 'User not found' });
        }
    } catch (errror) {
        console.error(errror);
        res.status(500).json({ message: 'Server error' });
    }

};
