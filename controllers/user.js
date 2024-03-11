const User = require('../models/user');
const path = require('path');

exports.getUser = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'expense.html'))
};

exports.postUser = async (req,res,next) => {
    const {name, email, password} = req.body;
    try{
        const user = await User.create({
            name,
            email,
            password
        });
        res.status(200).json(user);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: 'Error creating the user'})
    }

}