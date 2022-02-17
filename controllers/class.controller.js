const Database = require("../database");
const database = new Database();
const AttendanceRecord = require("../models/AttendanceRecord");

module.exports = {
    manageStudents: async (req, res) => {
        try {
            let { standard } = req.params;
            if (standard) {
                let students = await database.getStudentsByClass(standard);
                res.render("manageStudents", {
                    students,
                    msg: {
                        type: "success",
                        content: ""
                    },
                    standard
                });
            } else {
                res.render("error", { message: "Invalid standard" });
            }
        } catch (error) {
            res.render("error", { message: error.message });
        }
    },

    classAttendance: async (req, res, next) => {
        let { standard } = req.query;
        let { month } = req.query;

        if (standard) {
            if (!month) {
                try {
                    let students = await database.getStudentsByClass(standard);
                    let attendance = await AttendanceRecord.find({
                        standard
                    });
                    if (attendance.length >= 1) {
                        res.render("classAttendance", {
                            attendance,
                            students,
                            standard,
                            month: Date.now()
                        });
                    } else {
                        res.render("error", {
                            message: `No Records for attendance of class '${standard.toUpperCase()}'`
                        });
                    }
                } catch (error) {
                    res.render("error.ejs", {
                        message: error.message
                    });
                }
            } else {
                try {
                    let students = await database.getStudentsByClass(standard);
                    let attendance = await AttendanceRecord.find({
                        standard,
                        month: month.toLowerCase()
                    });
                    if (attendance.length >= 1) {
                        res.render("classAttendance", {
                            attendance,
                            students,
                            standard,
                            month
                        });
                    } else {
                        res.render("error", {
                            message: `No Records for attendance of class '${standard.toUpperCase()}'`
                        });
                    }
                } catch (error) {
                    res.render("error.ejs", {
                        message: error.message
                    });
                }
            }
        } else {
            res.render("error", {
                message: "Invalid standard"
            });
        }
    }
};
