let Database = require('../Database');
let database = new Database();
let crypto = require('crypto');
let express = require('express');

module.exports = {
    render: (req, res, next) => {
        if (req.session.loggedIn) return res.redirect('/');
        res.render('login.ejs', {
            msg: {
                type: 'success',
                content: ''
            }
        });
    },

    /**
     * 
     * @param {express.Request} req 
     * @param {express.Response} res 
     * @param {express.NextFunction} next 
     */    
    login: async (req, res, next) => {
        var { username } = req.body;
        var { password } = req.body;
        var hashedPassword = crypto.createHash("md5").update(password).digest("hex");
    
        try {
            var user = await database.verifyLogin(username);
            if (user) {
                if (user.username === username && user.password === hashedPassword) {
                    req.session.loggedIn = true;
                    req.session.username = user.fullName;
                    res.redirect('/');
                }
            } else {
                res.render('login.ejs', {
                    msg: {
                        type: 'danger',
                        content: 'Incorrect username/password'
                    }
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