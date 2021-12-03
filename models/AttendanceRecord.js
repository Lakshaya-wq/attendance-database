let mongoose = require("mongoose");
const { months } = require("../constants");

const DatabaseSchema = mongoose.Schema({
    month: {
        type: String,
        default: months[new Date().getMonth()]
    },
    date: {
        type: String,
        default: `${new Date().getDate()}-${
            new Date().getMonth() + 1
        }-${new Date().getFullYear()}`
    },
    standard: String,
    present: [Number]
});

const AttendanceRecord = mongoose.model("AttendanceRecord", DatabaseSchema);

module.exports = AttendanceRecord;
