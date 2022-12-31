const mongoose = require('mongoose')

const journeySchema = new mongoose.Schema({
    Departure: {
        type: String,
        required: true
    },
    Return: {
        type: String,
        required: true,
        unique: true
    },
    Departure_station_id:{
        type: Number,
        required: true,
        unique: true
    },
    Departure_station_name: {
        type: String,
        required: true
    },
    Return_station_id:{
        type: Number,
        required: true,
        unique: true
    },
    Return_station_name: {
        type: String,
        required: true,
        unique: true
    },
    Covered_distance:{
        type: Number,
        required: true,
    },
    Duration:{
        type: Number,
        required: true,
    },
})

const Journey = mongoose.model('Journey', journeySchema);


module.exports = {
    Journey
}