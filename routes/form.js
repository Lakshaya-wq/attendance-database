var express = require('express');
var router = express.Router();
var Database = require('../Database');
const database = new Database('db.sqlite3');

/* GET home page. */
router.get('/attendance/:standard', async function(req, res, next) {
    var { standard } = req.params;
    var { date } = req.query;
    var students = await database.getStudentsByClass(standard);
    res.render('form', {
        students: students,
        standard: standard,
        date: date
    });
});

router.get('/attendance', async function(req, res, next) {
    var { standard } = req.query;
    var { date } = req.query;
    var students = await database.getStudentsByClass(standard);
    students.map(async ({id}) => {
        var student = await database.getStudentById(id);
        if (req.query.present && req.query.present[id]) {
            database.setAttendance(date, standard, student.roll_no, student.name, 'P');
        } else {
            database.setAttendance(date, standard, student.roll_no, student.name, 'A');
        }
    });
    res.json(req.query);
});

module.exports = router;
