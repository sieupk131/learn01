const mongoose = require('mongoose');
const {Schema} = mongoose
const User = new Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('users',User)