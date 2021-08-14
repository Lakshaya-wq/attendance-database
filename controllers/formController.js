let Database = require('../Database');
let database = new Database('db.sqlite3');
let AttendanceDatabase = require('../models/database');

let months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];


/**
 * @type {Date}
 * @param {String} _date
 * @param {String} _format
 * @param {String} _delimiter
*/
let parseDate = (_date,_format,_delimiter) => {
    var formatLowerCase=_format.toLowerCase();
    var formatItems=formatLowerCase.split(_delimiter);
    var dateItems=_date.split(_delimiter);
    var monthIndex=formatItems.indexOf("mm");
    var dayIndex=formatItems.indexOf("dd");
    var yearIndex=formatItems.indexOf("yyyy");
    var month=parseInt(dateItems[monthIndex]);
    month-=1;
    var formattedDate = new Date(dateItems[yearIndex],month,dateItems[dayIndex]);
    return formattedDate;
}

module.exports = {
    attendanceController: async (req, res, next) => {
        let { standard } = req.params;
        if (!req.session.loggedIn) return res.redirect(`/login`);
        let dateObj = new Date();
        let date = `${dateObj.getDate()}-${dateObj.getMonth()+1}-${dateObj.getFullYear()}`;
        let students = await database.getStudentsByClass(standard);
        let attendance = await AttendanceDatabase.findOne({
            date: date,
            standard: standard
        });
        res.render('form', {
            students: students,
            standard: standard,
            date: date,
            msg: {
                content: '',
                type: 'success'
            },
            attendance: attendance
        });
    },

    setAttendanceController: async (req, res, next) => {
        let { standard } = req.query;
        if (!req.session.loggedIn) return res.redirect(`/login`);
        let { date } = req.query;
        let students = await database.getStudentsByClass(standard);
    
        AttendanceDatabase.findOne({
            date: date,
            standard: standard
        }, async (err, att) => {
            if (err) return res.render('error', { message: err.message });
            if (att) {
                try {
                    await AttendanceDatabase.updateOne({
                        date: date,
                        standard: standard
                    },
                    {
                        present: Object.keys(req.query.present).map((e) => (students.filter(({id}) => id === e))[0].roll_no)
                    });
                    res.render('form', {
                        students: students,
                        standard: standard,
                        date: date,
                        msg: {
                            content: 'Success: updated attendance',
                            type: 'success'
                        },
                        attendance: await AttendanceDatabase.findOne({
                            date: date,
                            standard: standard
                        })
                    });
                } catch (error) {
                    res.end();
                    console.log(error);
                }
            } else {
                var newAttendance = new AttendanceDatabase({
                    month: months[parseDate(date, "dd-mm-yyyy", "-").getMonth()],
                    date: date,
                    standard: standard,
                    present: Object.keys(req.query.present).map((e) => (students.filter(({id}) => id === e))[0].roll_no)
                });
    
                try {
                    await newAttendance.save();
                    
                    res.render('form', {
                        students: students,
                        standard: standard,
                        date: `${(new Date()).getDate()}-${(new Date()).getMonth()+1}-${(new Date()).getFullYear()}`,
                        msg: {
                            content: 'Success: set attendance',
                            type: 'success'
                        },
                        attendance: await AttendanceDatabase.findOne({
                            date: date,
                            standard: standard
                        })
                    })
                } catch (error) {
                    res.render('error', { message: error.message });
                }
            }
        });
    }
}