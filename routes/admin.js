const express = require('express');
const router = express.Router();

const adminController = require('../controllers/user');


router.get('/addUser', adminController.getUser);
router.post('/addUser', adminController.postUser);


module.exports = router;