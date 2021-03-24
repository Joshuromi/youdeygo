const mongoose = require('mongoose'); 

const requestSchema = new mongoose.Schema({
    rideId: String,
    userId: String,
    driverName: String,
    passengerName: String,
    driverPhone: String,
    carName: String,
    plateNumber: String,
    depature: String,
    destination: String,
    time: String,
    seats: Number,
    cost: Number,
    message: String,
    status: String,
    createdAt: String,
    updatedAt: String,
});

module.exports = mongoose.model('Request', requestSchema);