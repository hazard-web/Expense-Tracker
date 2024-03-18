const jwt = require('jsonwebtoken');
const User = require('../models/user');


const authenticate = (res, req, next) => {

    try{
        const token = req.header('authorization');
        console.log(token);
        const user = jwt.verify(token, 'secretkey');
        console.log('userID >>> ', user.userId);
        User.findByPk(user.userId).then(user => {
            console.log(JSON.stringify(user));
            req.user = user;
            next();
        })

    }   catch(err) {
        console.log(err);
        return res.status(401).json({message: 'Unauthorized'});
    }
};


module.exports = {
    authenticate
};