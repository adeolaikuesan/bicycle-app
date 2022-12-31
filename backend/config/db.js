// const mongoose = require('mongoose')
// mongoose.set('strictQuery', false);

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI)
//     console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
//   } catch (error) {
//     console.log(error)
//     process.exit(1)
//   }
// }

// module.exports = connectDB


const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres:postgress@localhost:5433/postgres'
});

client.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err.stack);
  } else {
    console.log('Connected to database');
  }
});

module.exports = client;


// Fetch all data from 2021-06.csv and 2021-07 files
// client.query('SELECT * FROM public."Journeys2"', (err, res) => {
//   if (err) {
//     console.error('Error executing query:', err.stack);
//   } else {
//     // console.log(res.rows);
//   }
// });