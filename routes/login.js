let express = require('express');
let router = express.Router();
let { render, login, logout } = require('../controllers/loginController')

router.get('/login', render);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
