const mongoose = require('mongoose'); 

const rideSchema = new mongoose.Schema({
    userId: String,
    driverName: String,
    driverPhone: String,
    carName: String,
    plateNumber: String,
    depature: String,
    destination: String,
    time: String,
    scheduleDate: String,
    seats: Number,
    cost: Number,
    description: String,
    createdAt: String,
    updatedAt: String,
});

module.exports = mongoose.model('Ride', rideSchema);