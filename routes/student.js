let express = require('express');
let router = express.Router();
let Database = require('../Database');
const database = new Database('db.sqlite3');
let { readFileSync } = require('fs');

// dynamic router based on the standard and the student
// it is provided
router.get('/student', async function(req, res, next) {
  // get the student from the request url
  let { roll_no } = req.query;
  // get the standard from the request url
  let { standard } = req.query;
  if (!req.session.loggedIn) return res.redirect(`/login?action=${encodeURIComponent(`/student/?roll_no=${roll_no}&standard=${standard}`)}`);
  // get the attendance from the database
  // depending upon the student roll no and standard
  console.log(roll_no, standard);
  console.log(encodeURIComponent(`/student/?roll_no=${roll_no}&standard=${standard}`));
  let student = await database.getStudent(roll_no, standard);
  let attendance = JSON.parse(readFileSync("./attendance.json", "utf-8").toString())[standard.toUpperCase()];
  let dates = Object.keys(attendance);
  // render getAttendance.ejs with the attendance of the student and the percentage of his attendance
  if (dates.length >= 1) {
    res.render('getAttendance', {
      attendance: attendance,
      student: student,
      dates: dates
    });
  } else {
    res.render('error', {
      message: `No Records for attendance of this student`
    })
  }
});

module.exports = router;
