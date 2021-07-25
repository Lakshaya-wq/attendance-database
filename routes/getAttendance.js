var express = require('express');
var router = express.Router();
var Database = require('../Database');
const database = new Database('db.sqlite3');
/* GET home page. */
router.get('/getAttendance', async function(req, res, next) {
  var standard = req.query.class;
  var { roll_no } = req.query;
  var attendance = await database.getAttendance(roll_no, standard);
  res.render('getAttendance', {
    attendance: attendance,
    pcnt: `${parseInt((attendance.filter(({att}) => att === 'P').length * 100) / attendance.length)}%`
  });
});

module.exports = router;
