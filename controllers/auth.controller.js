let Database = require("../database");
let database = new Database();
let crypto = require("crypto");

module.exports = {
    render: (req, res, next) => {
        if (req.session.loggedIn) return res.redirect("/");
        res.render("login.ejs", {
            msg: {
                type: "success",
                content: ""
            }
        });
    },

    login: async (req, res, next) => {
        var { username } = req.body;
        var { password } = req.body;
        var hashedPassword = crypto
            .createHash("md5")
            .update(password)
            .digest("hex");

        try {
            var user = await database.verifyLogin(username);
            if (user) {
                if (
                    user.username === username &&
                    user.password === hashedPassword
                ) {
                    req.session.loggedIn = true;
                    req.session.user = user;
                    res.redirect("/");
                }
            } else {
                res.render("login.ejs", {
                    msg: {
                        type: "danger",
                        content: "Incorrect username/password"
                    }
                });
            }
        } catch (error) {
            res.render("error", {
                message: error.message
            });
        }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.redirect("/auth/login");
    }
};
