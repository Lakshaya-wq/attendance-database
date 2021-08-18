let mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    _id: String,
    standard: {
        type: String,
        required: true
    },
    roll_no: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports = Student;
