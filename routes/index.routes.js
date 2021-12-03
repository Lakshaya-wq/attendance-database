let express = require("express");
let router = express.Router();
let indexController = require("../controllers/index.controller");

router.get("/", indexController);

module.exports = router;
