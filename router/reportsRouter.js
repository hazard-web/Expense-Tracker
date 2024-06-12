const express = require('express');
const router = express.Router();

const reportController = require("../controllers/reportsController");

router.get('/getReportsPage', reportController.getReportPage);

module.exports = router;