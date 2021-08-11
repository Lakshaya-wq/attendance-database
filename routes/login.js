let express = require('express');
let router = express.Router();
let Database = require('../Database');
const database = new Database('db.sqlite3');
let crypto = require('crypto');

/* GET home page. */
router.get('/login', function(req, res, next) {
    if (req.session.loggedIn) return res.redirect(req.query.action ? req.query.action : '/');
    var { action } = req.query;
    res.render('login.ejs', {
        msg: '',
        action: action
    });
});

router.post('/login', async function(req, res, next) {
    var { username } = req.body;
    var { password } = req.body;
    var { action } = req.body;
    var hashedPassword = crypto.createHash("md5").update(password).digest("hex");

    try {
        var user = await database.verifyLogin(username);
        if (user) {
            if (user.username === username && user.password === hashedPassword) {
                req.session.loggedIn = true;
                req.session.username = user.fullName;
                res.redirect(action ? action : '/');
            }
        } else {
            res.render('login.ejs', {
                msg: 'Incorrect username/password'
            });
        }
    } catch (error) {
        res.render('error', {
            message: error.message
        });
    }
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
