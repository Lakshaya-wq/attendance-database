const express = require("express");
const router = express.Router();
const controllers = require("../controllers/attendance.controller");

router.get("/:standard", controllers.attendanceController);
router.post("/", controllers.setAttendance);

module.exports = router;
