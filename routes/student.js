var express = require('express');
var router = express.Router();
var Database = require('../Database');
const database = new Database('db.sqlite3');
/* GET home page. */
router.get('/student', async function(req, res, next) {
  var standard = req.query.class;
  var { roll_no } = req.query;
  res.render('student', {student: await database.getStudent(roll_no, standard)});
});

module.exports = router;
