require('dotenv').config()
const express = require('express')
const port = process.env.PORT || "8080"
const journeyRoutes = require('./routes/journeys');
const stationRoutes = require('./routes/stations');

const app = express()

app.use('/api/journeys', journeyRoutes);
app.use('/api/stations', stationRoutes);

app.listen({ port , host: "0.0.0.0" });
// app.listen(port, () => console.log(`Server started on port ${port}`))
