var express = require('express');
var router = express.Router();
var Database = require('../Database');
var database = new Database('db.sqlite3');

// GET home page
router.get('/', async function(req, res, next) {
    if (!req.session.loggedIn) return res.redirect('/login?action=/');
    var username = req.session.username;
    let students = {
        xa: await database.getStudentsByClass('xa'),
        xb: await database.getStudentsByClass('xb'),
        xc: await database.getStudentsByClass('xc'),
        xi: await database.getStudentsByClass('xi'),
        xii: await database.getStudentsByClass('xii')
    }
    res.render('index.ejs', {
        students: students,
        username: username
    });
});

// router.get('/sessions', function (req, res) {
//     req.sessionStore.all((err, sessions) => {
//         if (err) throw err;
//         else res.json(sessions);
//     });
// });

module.exports = router;
