const { env } = process;

exports.DB_URI =
    process.env.NODE_ENV === "production"
        ? `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_HOST}/${env.DB_NAME}?retryWrites=true&w=majority`
        : "mongodb://localhost:27017/attendance-database";
exports.PORT = env.PORT || 3000;
exports.SESSION_SECRET = env.SESSION_SECRET;
