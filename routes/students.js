let express = require('express');
let router = express.Router();
let Database = require('../Database');
const database = new Database('db.sqlite3');
const AttendanceDatabase = require('../models/database');

// dynamic router based on what standard it is passed
router.get('/class/', async function(req, res, next) {
  let { standard } = req.query;
  let { month } = req.query;
  if (!req.session.loggedIn) return res.redirect(`/login?action=${encodeURIComponent(`/class/?standard=${standard}`)}`);

  if (standard) {
    if (!month) {
      try {
        let students = await database.getStudentsByClass(standard);
        let attendance = await AttendanceDatabase.find({ standard: standard });
        if (attendance.length >= 1) {
          res.render('classAttendance', {
            attendance: attendance,
            students: students,
            standard: standard
          });
        } else {
          res.render('error', {
          message: `No Records for attendance of class '${standard.toUpperCase()}'`
        });
      }
        
      } catch (error) {
        res.render('error.ejs', {
          message: error.message
        })
      }
    } else {
      try {
        let students = await database.getStudentsByClass(standard);
        let attendance = await AttendanceDatabase.find({ standard: standard, month: month.toLowerCase() });
        if (attendance.length >= 1) {
          res.render('classAttendance', {
            attendance: attendance,
            students: students,
            standard: standard
          });
        } else {
          res.render('error', {
          message: `No Records for attendance of class '${standard.toUpperCase()}'`
        });
      }
        
      } catch (error) {
        res.render('error.ejs', {
          message: error.message
        })
      }
    }
  } else {
    res.render('error', {
      message: 'Invalid standard'
    })
  }
});

module.exports = router;
