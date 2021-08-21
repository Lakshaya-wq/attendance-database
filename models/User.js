let mongoose = require('mongoose');
let { v4: uuid } = require('uuid');

const UserSchema = mongoose.Schema({
    _id: String,
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        unique: true,
        required: true,
        default: uuid()
    },
    fullName: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
