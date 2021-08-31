let Database = require('../Database');
let database = new Database();

module.exports = async (req, res, next) => {
    if (!req.session.loggedIn) return res.redirect('/login');
    let username = req.session.user.fullName;
    let students = {
        "vi b": await database.getStudentsByClass('x b'),
        "vii b": await database.getStudentsByClass('vii b'),
        "x a": await database.getStudentsByClass('x a')
    }
    res.render('index.ejs', {
        students: students,
        username: username
    });
}