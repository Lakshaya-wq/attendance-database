let express = require('express');
let router = express.Router();
let Database = require('../Database');
const database = new Database('db.sqlite3');
let crypto = require('crypto');

/* GET home page. */
router.get('/login', function(req, res, next) {
    if (req.session.loggedIn) return res.redirect('/');
    res.render('login.ejs');
});

router.post('/login', async function(req, res, next) {
    var { email } = req.body;
    var { password } = req.body;
    var hashedPassword = crypto.createHash("md5").update(password).digest("hex");

    try {
        var user = await database.verifyLogin(email);
        if (user) {
            if (user.email === email && user.password === hashedPassword) {
                req.session.loggedIn = true;
                req.session.username = user.username;
                res.redirect('/');
            }
        } else {
            res.render('error.ejs', {
                message: 'No such user'
            });
        }
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/logout', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
