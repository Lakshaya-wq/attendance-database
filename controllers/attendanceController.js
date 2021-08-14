let Database = require('../Database');
let database = new Database('db.sqlite3');
let AttendanceDatabase = require('../models/database');

module.exports = {
    studentAttendanceController: async (req, res, next) => {
        let { roll_no } = req.query;
        let { standard } = req.query;
        if (!req.session.loggedIn) return res.redirect(`/login?action=${encodeURIComponent(`/student/?roll_no=${roll_no}&standard=${standard}`)}`);
        let student = await database.getStudent(roll_no, standard);
        let attendance = await AttendanceDatabase.find({ standard: standard });
        if (attendance.length >= 1) {
            res.render('getAttendance', {
                attendance: attendance,
                student: student,
            });
        } else {
            res.render('error', {
                message: `No Records for attendance of this student`
            })
        }
    },

    classAttendanceController: async (req, res, next) => {
        let { standard } = req.query;
        let { month } = req.query;
        if (!req.session.loggedIn) return res.redirect(`/login?action=${encodeURIComponent(`/class/?standard=${standard}`)}`);
      
        if (standard) {
            if (!month) {
                try {
                    let students = await database.getStudentsByClass(standard);
                    let attendance = await AttendanceDatabase.find({ standard: standard });
                    if (attendance.length >= 1) {
                        res.render('classAttendance', {
                        attendance: attendance,
                        students: students,
                        standard: standard
                        });
                    } else {
                        res.render('error', {
                        message: `No Records for attendance of class '${standard.toUpperCase()}'`
                    });
                    }
                
                } catch (error) {
                    res.render('error.ejs', {
                        message: error.message
                    });
                }
            } else {
                try {
                    let students = await database.getStudentsByClass(standard);
                    let attendance = await AttendanceDatabase.find({ standard: standard, month: month.toLowerCase() });
                    if (attendance.length >= 1) {
                        res.render('classAttendance', {
                            attendance: attendance,
                            students: students,
                            standard: standard
                        });
                    } else {
                        res.render('error', {
                            message: `No Records for attendance of class '${standard.toUpperCase()}'`
                        });
                    }
                } catch (error) {
                res.render('error.ejs', {
                    message: error.message
                })
            }
        }
    } else {
        res.render('error', {
            message: 'Invalid standard'
        })
    }
}
}