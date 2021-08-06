var express = require('express');
var router = express.Router();
var Database = require('../Database');
var database = new Database('db.sqlite3');

// GET home page
router.get('/', async function(req, res, next) {
    let students = {
        x: await database.getStudentsByClass('x'),
        xi: await database.getStudentsByClass('xi'),
        xii: await database.getStudentsByClass('xii')
    }
    res.render('index.ejs', {
        students: students
    });
});

module.exports = router;
