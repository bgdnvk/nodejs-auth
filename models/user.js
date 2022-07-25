const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    role: {
        type: String,
        default: 'Basic',
        required: true
    },
    token: {
        type: String
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User;