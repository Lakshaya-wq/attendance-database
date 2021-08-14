let Database = require('../Database');
let database = new Database('db.sqlite3');
let crypto = require('crypto');

module.exports = {
    render: (req, res, next) => {
        if (req.session.loggedIn) return res.redirect(req.query.action ? req.query.action : '/');
        var { action } = req.query;
        res.render('login.ejs', {
            msg: '',
            action: action
        });
    },

    login: async (req, res, next) => {
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
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect('/login');
    }
}