const User = require('../models/user');
const path = require('path');
const bcrypt = require('bcrypt');

exports.getUser = async (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'views', 'signUp.html'))
};


exports.postUser = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create the user with the hashed password
        const user = await User.create({
            name,
            email,
            password: hashedPassword // Store hashed password in the database
        });

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating the user' });
    }
};
