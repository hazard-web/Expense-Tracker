const User = require('../models/user');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUser = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'signUp.html'))
};


exports.postUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.create({
            name,
            email,
            password: hashedPassword// Store hashed password in the database
        })
        return res.redirect('/signUp');
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating the user' });
    }
};


function generateAccessToken(id){
    return jwt.sign({ userId: id }, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
}
