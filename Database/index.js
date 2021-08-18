let sqlite3 = require('sqlite3');
let Student = require('../models/Student');

module.exports = class Database {
    constructor(file) {
        this.database = new sqlite3.Database(file);
    }


    getStudent(roll_no, standard) {
        return new Promise((resolve, reject) => {
            Student.findOne({ roll_no: roll_no, standard: standard }, function (err, student) {
                if (err) reject(err);
                else resolve(student);
            });
        });
    }
    

    async getStudentsByClass(standard) {
        try {
            let students = await Student.find({ standard: standard.toUpperCase() }).sort({ roll_no: 1 });
            return students;
        } catch (error) {
            throw new Error("No Students found");
        }
    }

    registerUser(email, password) {
        return new Promise((resolve, reject) => {
            this.database.prepare(`INSERT INTO users VALUES (null, ?, ?)`).run(email, password, function(err) {
                if (err) reject(err.message);
                else resolve("successfully added user");
            });
        });
    }

    verifyLogin(username) {
        return new Promise((resolve, reject) => {
            this.database.get(`SELECT * FROM users WHERE username="${username}"`, [], function(err, row) {
                if (err) reject(err);
                else resolve(row);
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
            student.save().then(() => resolve("Successfully added student"))
                .catch((e) => reject(e.message));
        });
    }


    removeStudentById(id) {
        return new Promise((resolve, reject) => {
            Student.findByIdAndDelete(id).then(() => resolve("Successfully added student"))
                .catch((e) => reject(e.message));
        });
    }


    editStudent(id, value) {
        return new Promise((resolve, reject) => {
            Student.findByIdAndUpdate(id, {
                name: value
            }, (error) => {
                if (error) reject(error.message);
                else resolve("Successfully changed student data");
            });
        });
    }
}