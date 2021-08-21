let express = require('express');
let router = express.Router();
let { attendanceController, setAttendanceController } = require('../controllers/formController');

router.get('/attendance/:standard', attendanceController);
router.post('/attendance', setAttendanceController);

module.exports = router;
