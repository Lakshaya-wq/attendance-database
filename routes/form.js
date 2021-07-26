var express = require('express');
var router = express.Router();
var Database = require('../Database');
const database = new Database('db.sqlite3');

/* GET home page. */
router.get('/attendance/:standard', async function(req, res, next) {
    var { standard } = req.params;
    var students = await database.getStudentsByClass(standard);
    res.render('form', {
        students: students.map(({id, name}) => ({id, name})),
        standard: standard
    });
});

router.get('/attendance', async function(req, res, next) {
    var { standard } = req.query;
    var students = await database.getStudentsByClass(standard);
    students.map(async ({id}) => {
        var student = await database.getStudentById(id);
        var date = new Date();
        if (req.query.present && req.query.present[id]) {
            database.setAttendance(`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`, standard, student.roll_no, student.name, 'P');
        } else {
            database.setAttendance(`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`, standard, student.roll_no, student.name, 'A');
        }
    });
    res.json(req.query);
});

module.exports = router;
