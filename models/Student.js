let mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    _id: String,
    standard: String,
    roll_no: Number,
    name: String
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
