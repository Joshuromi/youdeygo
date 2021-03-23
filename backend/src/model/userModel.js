const mongoose = require('mongoose'); 

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    password: String,
    role: Number,
    enabled: Boolean,
    verified: Boolean,
    profilePicture: {type: String, default: null},
    drivingLicence: {type: String, default: null},
    address: {type: String, default: null},
    createdAt: String,
    updatedAt: String,
});
 
module.exports =  mongoose.model('User', userSchema);