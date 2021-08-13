let express = require('express');
let router = express.Router();
let Database = require('../Database');
const database = new Database('db.sqlite3');
let { readFileSync } = require('fs');
const AttendanceDatabase = require('../models/database');

router.get('/student', async function(req, res, next) {
  let { roll_no } = req.query;
  let { standard } = req.query;
  if (!req.session.loggedIn) return res.redirect(`/login?action=${encodeURIComponent(`/student/?roll_no=${roll_no}&standard=${standard}`)}`);
  let student = await database.getStudent(roll_no, standard);
  let attendance = await AttendanceDatabase.find({ standard: standard });
  if (attendance.length >= 1) {
    res.render('getAttendance', {
      attendance: attendance,
      student: student,
    });
  } else {
    res.render('error', {
      message: `No Records for attendance of this student`
    })
  }
});

module.exports = router;
