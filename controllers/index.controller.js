let Database = require("../database");
let database = new Database();

module.exports = async (req, res, next) => {
    const {
        user: { fullName: username }
    } = req.session;
    const students = await database.getStudents();
    const classes = [];
    students.forEach(
        ({ standard }) =>
            classes.indexOf(standard) === -1 && classes.push(standard)
    );
    res.render("index.ejs", { students, username, classes });
};
