const Database = require("../database");
const database = new Database();
const { v4: uuid } = require("uuid");
const AttendanceRecord = require("../models/AttendanceRecord");

module.exports = {
    deleteStudent: async (req, res) => {
        try {
            await database.removeStudentById(req.params.id);
            res.end();
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    },

    editStudentDetails: async (req, res) => {
        try {
            let { id } = req.params;
            let { name } = req.body;
            await database.editStudent(id, name);
            res.end("Successfully edited student details");
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    },

    createStudent: async (req, res) => {
        try {
            let { studentRNo } = req.body;
            let { studentName } = req.body;
            let { standard } = req.params;
            await database.addStudent(
                uuid(),
                parseInt(studentRNo),
                standard.toString(),
                studentName
            );
            res.end("Added student");
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    },

    student: async (req, res, next) => {
        let { roll_no } = req.query;
        let { standard } = req.query;

        let student = await database.getStudent(roll_no, standard);
        let attendance = await AttendanceRecord.find({ standard: standard });
        if (attendance.length >= 1) {
            res.render("getAttendance", {
                attendance: attendance,
                student: student
            });
        } else {
            res.render("error", {
                message: `No Records for attendance of this student`
            });
        }
    }
};
