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

  router.get('/departures', (req, res) => {
    const id = req.query.id
    client.query(`SELECT COUNT(*) FROM "Journeys2"  WHERE duration > 10 AND covered_distance > 10 AND departure_station_id = ${id} `, (err, result) => {
      if (err) {
        res.status(500).send(err);
        console.log("Error occured")
      } else {
        res.send(result.rows);
      }
    });
  });

  router.get('/returns', (req, res) => {
    const id = req.query.id
    client.query(`SELECT COUNT(*) FROM "Journeys2" WHERE duration > 10 AND covered_distance > 10 AND return_station_id = ${id}`, (err, result) => {
      if (err) {
        res.status(500).send(err);
        console.log("Error occured")
      } else {
        res.send(result.rows);
      }
    });
  });

  router.get('/avg_departure', (req, res) => {
    const id = req.query.id
    client.query(`SELECT AVG(covered_distance) FROM "Journeys2" WHERE duration > 10 AND covered_distance > 10 AND departure_station_id =${id}`, (err, result) => {
      if (err) {
        res.status(500).send(err);
        console.log("Error occured")
      } else {
        res.send(result.rows);
      }
    });
  });

  router.get('/returns/avg', (req, res) => {
    const id = req.query.id
    client.query(`SELECT AVG(covered_distance) FROM "Journeys2" WHERE duration > 10 AND covered_distance > 10 AND return_station_id =${id}`, (err, result) => {
      if (err) {
        res.status(500).send(err);
        console.log("Error occured")
      } else {
        res.send(result.rows);
      }
    });
  });




module.exports = router;