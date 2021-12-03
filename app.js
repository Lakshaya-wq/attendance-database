// .env configuration
require("dotenv").config();

// necessary imports
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const minifyHTML = require("express-minify-html-2");
const minify = require("express-minify");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

// Routes import
const authRoutes = require("./routes/auth.routes");
const indexRoutes = require("./routes/index.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const studentRoutes = require("./routes/student.routes");
const classRoutes = require("./routes/class.routes");

// config
const config = require("./config");

// custom middleware
const auth = require("./middleware/auth");

// app initialization
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// mime type parser setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use minification
app.use(
    minifyHTML({
        override: true,
        exception_url: false,
        htmlMinifier: {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            minifyJS: true
        }
    })
);
app.use(minify());

// logger setup
app.use(logger("tiny"));

// cookie parser and session store setup
app.use(cookieParser());
const store = new MongoDBStore({
    uri: config.DB_URI,
    collection: "sessions"
});
store.on("error", console.log);
app.use(
    session({
        secret: config.SESSION_SECRET,
        resave: true,
        store: store,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 360
        }
    })
);

// public file root setup
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/auth", authRoutes);
app.use("/", auth, indexRoutes);
app.use("/attendance", auth, attendanceRoutes);
app.use("/class", auth, classRoutes);
app.use("/student", auth, studentRoutes);

module.exports = app;
