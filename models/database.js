let mongoose = require('mongoose');

const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

const DatabaseSchema = mongoose.Schema({
    month: {
        type: String,
        default: months[(new Date()).getMonth()]
    },
    date: {
        type: String,
        default: `${(new Date()).getDate()}-${(new Date()).getMonth()+1}-${(new Date()).getFullYear()}`
    },
    standard: String,
    present: [ Number ]
});

const AttendanceDatabase = mongoose.model('AttendanceDatabase', DatabaseSchema);

module.exports = AttendanceDatabase;