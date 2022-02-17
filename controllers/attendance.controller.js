const Database = require("../database");
const database = new Database();
const { months } = require("../constants");
const AttendanceRecord = require("../models/AttendanceRecord");

/**
 * @param {String} _date
 * @param {String} _format
 * @param {String} _delimiter
 * @returns {Date}
 */
const parseDate = (_date, _format, _delimiter) => {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formattedDate = new Date(
        dateItems[yearIndex],
        month,
        dateItems[dayIndex]
    );
    return formattedDate;
};

module.exports = {
    attendanceController: async (req, res, next) => {
        let { standard } = req.params;

        let dateObj = new Date();
        let date = `${dateObj.getDate()}-${
            dateObj.getMonth() + 1
        }-${dateObj.getFullYear()}`;
        let students = await database.getStudentsByClass(standard);
        let attendance = await AttendanceRecord.findOne({
            date: date,
            standard: standard
        });
        res.render("form", {
            students,
            standard,
            date,
            msg: {
                content: "",
                type: "success"
            },
            attendance
        });
    },

    setAttendance: async (req, res, next) => {
        let { standard } = req.body;

        let { date } = req.body;
        let students = await database.getStudentsByClass(standard);

        AttendanceRecord.findOne({ date, standard }).exec(async (err, att) => {
            if (err) return res.render("error", { message: err.message });
            if (att) {
                try {
                    await AttendanceRecord.updateOne(
                        { date, standard },
                        {
                            present: Object.keys(req.body.present).map(
                                (e) =>
                                    students.find(({ id }) => id === e).roll_no
                            )
                        }
                    );
                    res.render("form", {
                        students,
                        standard,
                        date,
                        msg: {
                            content: "Success: updated attendance",
                            type: "success"
                        },
                        attendance: await AttendanceRecord.findOne({
                            date,
                            standard
                        })
                    });
                } catch (error) {
                    res.end();
                    console.log(error);
                }
            } else {
                let currentDate = parseDate(date, "dd-mm-yyyy", "-");
                let currentMonth = `${
                    months[currentDate.getMonth()]
                }-${currentDate.getFullYear()}`;

                if (req.body.present) {
                    var newAttendance = new AttendanceRecord({
                        month: currentMonth,
                        date,
                        standard,
                        present: Object.keys(req.body.present).map(
                            (e) => students.find(({ id }) => id === e).roll_no
                        )
                    });
                } else {
                    var newAttendance = new AttendanceRecord({
                        month: currentMonth,
                        date,
                        standard,
                        present: []
                    });
                }

                try {
                    await newAttendance.save();

                    res.render("form", {
                        students,
                        standard,
                        date: `${new Date().getDate()}-${
                            new Date().getMonth() + 1
                        }-${new Date().getFullYear()}`,
                        msg: {
                            content: "Success: set attendance",
                            type: "success"
                        },
                        attendance: await AttendanceRecord.findOne({
                            date,
                            standard
                        })
                    });
                } catch (error) {
                    res.render("error", { message: error.message });
                }
            }
        });
    }
};
