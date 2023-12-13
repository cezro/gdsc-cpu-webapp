const pool = require('./db/database/db');
const express = require('express');
const cors = require('cors');
const PORT = 3001;

const app = express();

app.use(cors());

app.get('/api/home', (req, res) => {
  res.json({ message: 'Sent to console.' });
});

app.get('/db/test', (req, res) => {
  res.json({ message: pool.pool });
});

app.listen(PORT, () => {
  console.log('Server started on', PORT);
});
