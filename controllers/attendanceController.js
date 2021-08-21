let Database = require('../Database');
let database = new Database();
let AttendanceRecord = require('../models/AttendanceRecord');

module.exports = {
    studentAttendanceController: async (req, res, next) => {
        let { roll_no } = req.query;
        let { standard } = req.query;
        if (!req.session.loggedIn) return res.redirect(`/login`);
        let student = await database.getStudent(roll_no, standard);
        let attendance = await AttendanceRecord.find({ standard: standard });
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
        if (!req.session.loggedIn) return res.redirect(`/login`);
      
        if (standard) {
            if (!month) {
                try {
                    let students = await database.getStudentsByClass(standard);
                    let attendance = await AttendanceRecord.find({ standard: standard });
                    if (attendance.length >= 1) {
                        res.render('classAttendance', {
                            attendance: attendance,
                            students: students,
                            standard: standard,
                            month: Date.now()
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
                    let attendance = await AttendanceRecord.find({ standard: standard, month: month.toLowerCase() });
                    if (attendance.length >= 1) {
                        res.render('classAttendance', {
                            attendance: attendance,
                            students: students,
                            standard: standard,
                            month: month
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