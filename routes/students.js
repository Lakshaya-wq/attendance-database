var express = require('express');
var router = express.Router();
var Database = require('../Database');
const database = new Database('db.sqlite3');
/* GET home page. */
router.get('/class/:standard', async function(req, res, next) {
  var { standard } = req.params;
  var attendance = await database.getAttendanceByClass(standard);
  res.render('classAttendance', {attendance: attendance, pcnt: parseInt((attendance.filter(({att}) => att === 'P').length * 100) / attendance.length)});
});

module.exports = router;
