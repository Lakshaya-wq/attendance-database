var express = require('express');
var router = express.Router();
var Database = require('../Database');
const database = new Database('db.sqlite3');

// dynamic router based on the standard and the student
// it is provided
router.get('/student/:standard/:student', async function(req, res, next) {
  // get the student from the request url
  var { student } = req.params;
  // get the standard from the request url
  var { standard } = req.params;
  // get the attendance from the database
  // depending upon the student roll no and standard
  var attendance = await database.getAttendance(student, standard);
  // render getAttendance.ejs with the attendance of the student and the percentage of his attendance
  res.render('getAttendance', {
    attendance: attendance,
    pcnt: `${parseInt((attendance.filter(({att}) => att === 'P').length * 100) / attendance.length)}%`
  });
});

module.exports = router;
