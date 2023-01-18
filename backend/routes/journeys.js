const express = require("express");
const { getJourneys } = require("../controllers/journeys");
const router = express.Router();
const client = require("../config/db");

const QueryStream = require("pg-query-stream");

router.get("/", (req, res) => {
  const rows = [];
  // console.log(req.query.limit);

  const query = new QueryStream(
    `SELECT * FROM public."Journeys2" WHERE duration > 10 AND covered_distance > 10 LIMIT 10000 `
  );
  const stream = client.query(query);

  stream.on("data", (row) => {
    rows.push(row);
  });

  stream.on("end", () => {
    res.send(JSON.stringify(rows));
  });

  stream.on("error", (err) => {
    res.status(500).send(err);
  });
});

module.exports = router;
