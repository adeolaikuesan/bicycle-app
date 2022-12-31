const express = require('express')
const mongoose = require('mongoose')
const _ = require('lodash');

const { Journeys } = require('../models/Journey');
const router = express.Router();


exports.getJourneys =  async (req, res) => { 
    try {
        const Journeys = await Journey.find();
                
        res.status(200).json(Journeys);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// exports.saveJourneys = async (req, res) => { 
//     try {
//         const Journeys = await Journey.find();
                
//         res.status(200).json(Journeys);
//     } catch (error) {
//         res.status(404).json({ message: error.message });
//     }
// }