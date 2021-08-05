var express = require('express');
var router = express.Router();
var Database = require('../Database');
const database = new Database('db.sqlite3');
let { readFileSync } = require('fs');

// dynamic router based on what standard it is passed
router.get('/class/:standard', async function(req, res, next) {
  var { standard } = req.params;

  // get the attendance of the standard they requested
  let students = await database.getStudentsByClass(standard);
  let attendance = JSON.parse(readFileSync("./attendance.json", "utf-8").toString())[standard.toUpperCase()];
  let dates = Object.keys(attendance);
  if (dates.length >= 1) {
    // render the classAttendance.ejs file with the attendance,
  res.render('classAttendance', {
    attendance: attendance,
    pcnt: "100",
    students: students,
    standard: standard,
    dates: dates
  });
  } else {
    res.render('error', {
      message: `No Records for attendance of class '${standard.toUpperCase()}'`
    })
  }
});

module.exports = router;
