const express = require('express')
const port = process.env.PORT || 5001
const journeyRoutes = require('./routes/journeys');
const stationRoutes = require('./routes/stations');

const app = express()
// app.use(express.json()); //Let's see if you need this 

app.use('/api/journeys', journeyRoutes);
app.use('/api/stations', stationRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`))
