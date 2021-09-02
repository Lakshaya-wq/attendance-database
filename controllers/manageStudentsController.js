let Database = require('../Database');
let database = new Database();
let { v4: uuid } = require('uuid');

module.exports = {
    manageStudentsController: async (req, res) => {
        if (!req.session.loggedIn) return res.redirect('/login');
        try {
            let { standard } = req.params;
            if (standard) {
                let students = await database.getStudentsByClass(standard);
                res.render('manageStudents', {
                    students: students,
                    msg: {
                        type: 'success',
                        content: ''
                    },
                    standard: standard
                });
            } else {
                res.render('error', { message: "Invalid standard" });
            }
        } catch (error) {
            res.render('error', { message: error.message })
        }
    },

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

    editStudentController: async (req, res) => {
        if (!req.session.loggedIn) return res.redirect('/login');
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
    
    newStudentController: async (req, res) => {
        if (!req.session.loggedIn) return res.redirect('/login');
        try {
            let { studentRNo } = req.body;
            let { studentName } = req.body;
            let { standard } = req.params;
            await database.addStudent(uuid(), parseInt(studentRNo), standard.toString(), studentName);
            res.end("Added student");
        } catch (error) {
            console.log(error);
            res.status(500).end();
        }
    }
}