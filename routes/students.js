var express = require('express');
var router = express.Router();
var Database = require('../Database');
const database = new Database('db.sqlite3');
let { readFileSync } = require('fs');

// dynamic router based on what standard it is passed
router.get('/class/:standard', async function(req, res, next) {
  var { standard } = req.params;
  if (!req.session.loggedIn) return res.redirect(encodeURIComponent(`/login?action=/class/${standard}`));

  if (standard) {
    try {
      let students = await database.getStudentsByClass(standard);
      let attendance = JSON.parse(readFileSync("./attendance.json", "utf-8").toString())[standard.toUpperCase()];
      let dates = Object.keys(attendance);
      if (dates.length >= 1) {
        res.render('classAttendance', {
          attendance: attendance,
          students: students,
          standard: standard,
          dates: dates
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
    res.render('error', {
      message: 'Invalid standard'
    })
  }
});

module.exports = router;
