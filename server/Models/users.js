const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim:true

    },
    lastname: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    city:{
        type:String,
        required:true,
        trim:true
    },
    state:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
    },
    status: {
        type: Boolean, // Changed from String to Boolean
        default: true, // You can set a default value if needed
      }
    

}, { timestamps: true });

module.exports = mongoose.model('users', UserSchema);