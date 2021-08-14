let Database = require('../Database');
let database = new Database('db.sqlite3');
let express = require('express');

module.exports = {
    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    manageStudentsController: async (req, res) => {
        if (!req.session.loggedIn) return res.redirect('/login');
        try {
            let { standard } = req.params;
            if (standard) {
                let students = await database.getStudentsByClass(standard);
                if (students.length >= 1) {
                    res.render('manageStudents', {
                        students: students,
                        msg: {
                            type: 'success',
                            content: ''
                        },
                        standard: standard
                    });
                } else {
                    res.render('error', { message: "no students found" })
                }
            } else {
                res.render('error', { message: "Invalid standard" });
            }
        } catch (error) {
            res.render('error', { message: error.message })
        }
    },

    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    deleteStudentController: async (req, res) => {
        if (!req.session.loggedIn) return res.redirect('/login');
        try {
            await database.removeStudentById(req.params.id);
            res.end();
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    },

    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     */
    editStudentController: async (req, res) => {
        if (!req.session.loggedIn) return res.redirect('/login');
        try {
            let { id } = req.params;
            let { newValue } = req.body;
            await database.editStudent(id, "name", newValue);
            res.end();
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    }
}