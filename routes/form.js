let express = require('express');
let router = express.Router();
let Database = require('../Database');
const database = new Database('db.sqlite3');
let { writeFileSync, readFileSync } = require('fs');

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


/* GET home page. */
router.get('/attendance/:standard', async function(req, res, next) {
    let { standard } = req.params;
    let date = new Date();
    let students = await database.getStudentsByClass(standard);
    res.render('form', {
        students: students,
        standard: standard,
        date: `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`,
        msg: ''
    });
});

router.get('/attendance', async function(req, res, next) {
    let { standard } = req.query;
    let { date } = req.query;
    let students = await database.getStudentsByClass(standard);
    /** @type {object} */
    let attendance = JSON.parse(readFileSync("./attendance.json", "utf-8").toString());
    attendance[standard.toUpperCase()][date] = [];
    students.forEach((student) => {
        if (req.query.present && req.query.present[student.id]) {
            attendance[standard.toUpperCase()][date].push(student.roll_no);
            writeFileSync("./attendance.json", JSON.stringify(attendance));
        }
    });
    res.render('form', {
        students: students,
        standard: standard,
        date: `${(new Date()).getDate()}-${(new Date()).getMonth()+1}-${(new Date()).getFullYear()}`,
        msg: 'Success: set attendance'
    })
});

module.exports = router;
