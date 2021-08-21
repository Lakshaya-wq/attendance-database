let Student = require('../models/Student');
let User = require('../models/User');

module.exports = class Database {
    constructor() {}

    getStudent(roll_no, standard) {
        return new Promise((resolve, reject) => {
            Student.findOne({ roll_no: roll_no, standard: standard.toUpperCase() }).exec((err, student) => {
                if (err) reject(err);
                else resolve(student);
            })
        });
    }   

    getStudentsByClass(standard) {
        return new Promise((resolve, reject) => {
            Student.find({ standard: standard.toUpperCase() }).sort({ roll_no: 1 }).exec((err, students) => {
                if (err) reject(err.message);
                else resolve(students);
            });
        });
    }

    verifyLogin(username) {
        return new Promise((resolve, reject) => {
            User.findOne({ username: username }).exec((err, user) => {
                if (err) reject(err.message);
                else resolve(user);
            });
        });
    }


    addStudent(id, roll_no, standard, name) {
        return new Promise((resolve, reject) => {
            var student = new Student({
                _id: id,
                roll_no: roll_no,
                standard: standard.toUpperCase(),
                name: name
            });
            student.save((err) => {
                if (err) reject(err.message);
                else resolve("Added student");
            });
        });
    }


    removeStudentById(id) {
        return new Promise((resolve, reject) => {
            Student.findByIdAndDelete(id).exec((err, doc) => {
                if (err) reject(err.message);
                else resolve(doc);
            });
        });
    }


    editStudent(id, value) {
        return new Promise((resolve, reject) => {
            Student.findByIdAndUpdate(id, { name: value }).exec((err, doc) => {
                if (err) reject(err.message);
                else resolve(doc);
            });
        });
    }
}