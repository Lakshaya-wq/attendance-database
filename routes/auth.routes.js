let express = require("express");
let router = express.Router();
let controllers = require("../controllers/auth.controller");

router.get("/login", controllers.render);
router.post("/login", controllers.login);
router.get("/logout", controllers.logout);

module.exports = router;
