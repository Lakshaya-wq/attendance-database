var sqlite3 = require('sqlite3');

module.exports = class Database {
    constructor(file) {
        this.database = new sqlite3.Database(file);
    }

    getStudent(roll_no, standard) {
        return new Promise((resolve, reject) => {
            this.database.get(`SELECT roll_no, name FROM students WHERE (roll_no="${roll_no}" AND class="${standard.toUpperCase()}")`, [], (err, row) => {
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
            this.database.prepare(`INSERT INTO students VALUES (?, ?, ?, ?)`).run(id, roll_no, standard, name, function(err) {
                if (err) reject(err);
                else resolve("successfully added student");
            });
        });
    }

    removeStudentById(id) {
        return new Promise((resolve, reject) => {
            this.database.prepare(`DELETE FROM students WHERE id=?`).run(id, function(err) {
                if (err) reject(err.message);
                else resolve("successfully deleted student");
            });
        });
    }

    editStudent(id, field, value) {
        return new Promise((resolve, reject) => {
            this.database.prepare(`UPDATE students SET ${field}=? WHERE id="${id}"`).run(value, function(err) {
                if (err) reject(err.message);
                else resolve("successfully changed data");
            });
        });
    }
}