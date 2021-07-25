
var sqlite3 = require('sqlite3');

module.exports = class Database {
    constructor(file) {
        this.database = new sqlite3.Database(file);
    }

    getStudent(roll_no, standard) {
        return new Promise((resolve, reject) => {
            this.database.get(`SELECT roll_no, class, name FROM students WHERE (roll_no="${roll_no}" AND class="${standard.toUpperCase()}")`, [], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    getStudentsByClass(standard) {
        return new Promise((resolve, reject) => {
            this.database.all(`SELECT roll_no, name FROM students WHERE class="${standard.toUpperCase()}" ORDER BY roll_no ASC`, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    getAttendance(roll_no, standard) {
        return new Promise((resolve, reject) => {
            this.database.all(`SELECT date, name, att FROM attendance WHERE (roll_no="${roll_no}" AND class="${standard.toUpperCase()}")`, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    getAttendanceByClass(standard) {
        return new Promise((resolve, reject) => {
            this.database.all(`SELECT roll_no, date, name, att FROM attendance WHERE class="${standard.toUpperCase()}"`, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            })
        })
    }
}