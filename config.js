exports.DB_URI =
    process.env.NODE_ENV === "production"
        ? process.env.DB_URI
        : "mongodb://localhost:27017/attendanceDatabase";
exports.PORT = process.env.PORT || 3000;
exports.SESSION_SECRET =
    process.env.NODE_ENV === "production"
        ? process.env.SESSION_SECRET
        : "supersecret";
