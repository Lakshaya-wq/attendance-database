var sqlite3 = require('sqlite3');

module.exports = class Database {
    constructor(file) {
        this.database = new sqlite3.Database(file);
    }

    getStudent(name, standard) {
        return new Promise((resolve, reject) => {
            this.database.get(`SELECT roll_no, id, class, name FROM students WHERE (name="${name}" AND class="${standard.toUpperCase()}")`, [], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    getStudentsByClass(standard) {
        return new Promise((resolve, reject) => {
            this.database.all(`SELECT id, roll_no, name FROM students WHERE class="${standard.toUpperCase()}" ORDER BY roll_no ASC`, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}