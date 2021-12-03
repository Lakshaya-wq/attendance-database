const express = require("express");
const router = express.Router();
const controllers = require("../controllers/student.controller");

router.get("/", controllers.student);
router.post("/:standard", controllers.createStudent);
router.patch("/:id/edit", controllers.editStudentDetails);
router.delete("/:id/delete", controllers.deleteStudent);

module.exports = router;
