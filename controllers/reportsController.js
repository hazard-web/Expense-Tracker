const path = require('path');
const { report } = require('../router/expenseRouter');

exports.getReportPage = (req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'public', 'views', 'reports.html'));
};
