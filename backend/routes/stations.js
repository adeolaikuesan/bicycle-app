const express = require('express')
const { getJourneys } = require('../controllers/journeys');
const router = express.Router();
const client = require('../config/db');

// Get all stations

router.get('/', (req, res) => {
    client.query('SELECT * FROM public."Stations"', (err, result) => {
      if (err) {
        res.status(500).send(err);
        console.log("Error occured")
      } else {
        res.send(result.rows);
      }
    });
  });

module.exports = router;