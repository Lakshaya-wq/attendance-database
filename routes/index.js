var express = require('express');
var router = express.Router();
var Database = require('../Database');
const database = new Database('db.sqlite3');
/* GET home page. */
router.get('/student/:id', async function(req, res, next) {
  var { id } = req.params;
  res.render('index', {student: await database.getStudentByID(id)});
});

router.get('/students/:standard', async function(req, res, next) {
  var { standard } = req.params;
  res.render('students', {students: await database.getStudentsByClass(standard)});
});

module.exports = router;
