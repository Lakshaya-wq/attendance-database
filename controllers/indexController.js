let Database = require('../Database');
let database = new Database('db.sqlite3');

module.exports = async (req, res, next) => {
    if (!req.session.loggedIn) return res.redirect('/login');
    let username = req.session.username;
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
}