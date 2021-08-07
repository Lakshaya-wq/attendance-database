var express = require('express');
var router = express.Router();
var Database = require('../Database');
var database = new Database('db.sqlite3');

// GET home page
router.get('/', async function(req, res, next) {
    if (!req.session.loggedIn) return res.redirect('/login');
    var username = req.session.username;
    let students = {
        x: await database.getStudentsByClass('x'),
        xi: await database.getStudentsByClass('xi'),
        xii: await database.getStudentsByClass('xii')
    }
    res.render('index.ejs', {
        students: students,
        username: username
    });
});

module.exports = router;
