let express = require('express');
let router = express.Router();
let { manageStudentsController, deleteStudentController, editStudentController } = require('../controllers/manageStudentsController');

router.get('/manageStudents/:standard', manageStudentsController);
router.delete('/student/:id/delete', deleteStudentController);
router.patch('/student/:id/edit', editStudentController);
// router.get('/deleteStudent/:id');
// router.post('/addStudent');

module.exports = router;
