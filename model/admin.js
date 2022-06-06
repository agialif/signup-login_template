const mongoose= require('mongoose')
const Schema = mongoose.Schema;

const adminSchema= new Schema({
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

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;