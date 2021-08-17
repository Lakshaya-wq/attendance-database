let express = require('express');
let router = express.Router();
let { manageStudentsController, deleteStudentController, editStudentController, newStudentController } = require('../controllers/manageStudentsController');

router.get('/students/:standard/manage', manageStudentsController);
router.delete('/student/:id/delete', deleteStudentController);
router.patch('/student/:id/edit', editStudentController);
router.post('/student/new/:standard', newStudentController);

module.exports = router;
