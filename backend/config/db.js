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