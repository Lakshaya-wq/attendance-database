var express = require('express');
var router = express.Router();
var Database = require('../Database');
const database = new Database('db.sqlite3');
/* GET home page. */
router.get('/student/:standard/:student', async function(req, res, next) {
  var { student } = req.params;
  var { standard } = req.params;
  var attendance = await database.getAttendance(student, standard);
  res.render('getAttendance', {
    attendance: attendance,
    pcnt: `${parseInt((attendance.filter(({att}) => att === 'P').length * 100) / attendance.length)}%`
  });
});

module.exports = router;
