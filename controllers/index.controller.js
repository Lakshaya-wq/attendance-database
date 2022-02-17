const Database = require("../database");
const AttendanceRecord = require("../models/AttendanceRecord");

const database = new Database();

module.exports = async (req, res, next) => {
    const {
        user: { fullName: username }
    } = req.session;
    const students = await database.getStudents();
    const classes = [...new Set(students.map(({ standard }) => standard))].map(
        (s) => s
    );

    const attendanceRecords = await AttendanceRecord.find();
    const months = classes.map((c) => ({
        standard: c,
        months: [
            ...new Set(
                attendanceRecords
                    .filter(({ standard }) => standard === c)
                    .map(({ month }) => month)
            )
        ].map((month) => month)
    }));

    res.render("index.ejs", { students, username, classes, months });
};
