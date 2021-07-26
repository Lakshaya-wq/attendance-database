
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

    getStudentById(id) {
        return new Promise((resolve, reject) => {
            this.database.get(`SELECT roll_no, class, name FROM students WHERE id="${id.toLowerCase()}"`, [], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    getStudentsByClass(standard) {
        return new Promise((resolve, reject) => {
            this.database.all(`SELECT id, roll_no, name FROM students WHERE class="${standard.toUpperCase()}" ORDER BY roll_no ASC`, [], (err, rows) => {
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

    setAttendance(date, standard, roll_no, name, att) {
        this.database.all(`SELECT * FROM attendance WHERE (date="${date}" AND class="${standard.toUpperCase()}" AND roll_no=${roll_no})`, [], (err, rows) => {
            if (rows.length === 0) {
                this.database.prepare(`INSERT INTO attendance VALUES (?, ?, ?, ?, ?)`).run(date, standard.toUpperCase(), roll_no, name, att);
            }
        })
    }
}