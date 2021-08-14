let express = require('express');
let router = express.Router();
let { classAttendanceController, studentAttendanceController } = require('../controllers/attendanceController');

router.get('/class', classAttendanceController);
router.get('/student', studentAttendanceController);

module.exports = router;