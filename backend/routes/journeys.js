const express = require('express')
const { getJourneys } = require('../controllers/journeys');
const router = express.Router();
const client = require('../config/db');

// router.get('/', getJourneys);

// router.get('/', (req, res) => {
//     client.query('SELECT * FROM public."Journeys2"', (err, result) => {
//       if (err) {
//         res.status(500).send(err);
//         console.log("Error occured")
//       } else {
//         res.send(result.rows);
//       }
//     });
//   });


const QueryStream = require('pg-query-stream');

router.get('/', (req, res) => {
  const rows = [];
  console.log(req.query.limit)

  const page = req.query.page // Get the pagination page
  const per_page = req.query.limit // Indicates how many rows are visible on screen

  // const sort_field = req.query.sort;
  // const sort_order = req.query.order;

  // LIMIT ${limit} OFFSET ${page * per_page}

  const query = new QueryStream(`SELECT * FROM public."Journeys2" WHERE duration > 10 AND covered_distance > 10 LIMIT 10000 ` );
  const stream = client.query(query);

  stream.on('data', (row) => {
    rows.push(row);
  });

  stream.on('end', () => {
    res.send(JSON.stringify(rows)); 
  });

  stream.on('error', (err) => {
    res.status(500).send(err);
  });
});

module.exports = router;