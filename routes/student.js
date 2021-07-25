var express = require('express');
var router = express.Router();
var Database = require('../Database');
const database = new Database('db.sqlite3');
/* GET home page. */
router.get('/student', async function(req, res, next) {
  var { name } = req.query;
  var standard = req.query.class;
  res.render('student', {student: await database.getStudent(name, standard)});
});

module.exports = router;
