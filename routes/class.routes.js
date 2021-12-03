const express = require("express");
const router = express.Router();
const controllers = require("../controllers/class.controller");

router.get("/", controllers.classAttendance);
router.get("/:standard/manage", controllers.manageStudents);

module.exports = router;
