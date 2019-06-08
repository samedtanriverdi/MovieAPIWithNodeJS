const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 5
    }
})

module.exports = mongoose.model('user', UserSchema);