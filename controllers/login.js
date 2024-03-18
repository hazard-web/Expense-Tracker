const User = require('../models/user');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getLoginPage = async (req, res, next) => {
    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'views', 'login.html'))
    } catch (error) {
        next(error);
    }
};

function generateAccessToken(id){
    return jwt.sign({ userId: id }, 'secretkey');
}


exports.postLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        const user = await User.findAll({ where: { email } });
        if (user.length > 0) {
            const match = await new Promise((resolve, reject) =>{
                bcrypt.compare(password, user[0].password, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(result);
                })
            })
                if (match === true) {
                    const token = generateAccessToken(user[0].id);
                    return res.redirect('/addExpensePage');
                } else {
                   return res.status(400).json({ message: 'Invalid password' });
                }
        } else {
            res.status(401).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    } 
};

