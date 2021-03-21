const mongoose = require('mongoose'); 

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; 
const today =  new Date().toLocaleDateString("en-US", options);

const userSchema = new mongoose.Schema({
    fullName: String,
    phoneNumber: String,
    email: String,
    password: String,
    role: Number,
    enabled: Boolean,
    profilePicture: {type: String, default: null},
    drivingLicence: {type: String, default: null},
    address: {type: String, default: null},
    createdAt: { type: String, default: today },
    updatedAt: { type: String, default: today },
});
 
module.exports =  mongoose.model('User', userSchema)