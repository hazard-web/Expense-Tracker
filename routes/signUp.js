const express = require('express');
const router = express.Router();

const signUpController = require('../controllers/signUp');


router.get('/signUp', signUpController.getUser);
router.post('/signup', signUpController.postUser);



module.exports = router;