const mongoose = require('mongoose')
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        rrquired: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

var User = mongoose.model('User', userSchema)
module.exports = User;