var express = require('express');
var router = express.Router();
var Database = require('../Database');
const database = new Database('db.sqlite3');

// dynamic router based on what standard it is passed
router.get('/class/:standard', async function(req, res, next) {
  var { standard } = req.params;
  // get the attendance of the standard they requested
  var attendance = await database.getAttendanceByClass(standard);
  // render the classAttendance.ejs file with the attendance,
  // percentage of the attendance and the standard
  res.render('classAttendance', {
    attendance: attendance,
    pcnt: parseInt((attendance.filter(({att}) => att === 'P').length * 100) / attendance.length),
    standard: standard 
  });
});

module.exports = router;
