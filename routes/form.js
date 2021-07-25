var express = require('express');
var router = express.Router();
var Database = require('../Database');
const database = new Database('db.sqlite3');
/* GET home page. */
router.get('/form', async function(req, res, next) {
    var students = await database.getStudentsByClass("XI");
    res.render('form', {students: students});
});

router.post('/form-submit', async function(req, res, next) {
    var students = await database.getStudentsByClass("XI");
    students.forEach(({roll_no}) => {
        var isPresent = req.body[roll_no] === "true";
        console.log(isPresent);
    })
    res.json(req.body);
});

module.exports = router;
