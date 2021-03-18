const mongoose = require('mongoose'); 

const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }; 
const today =  new Date().toLocaleDateString("en-US", options);
const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    createdAt: { type: String, default: today }
});
 
module.exports =  mongoose.model('User', userSchema)