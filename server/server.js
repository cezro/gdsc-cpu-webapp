const express = require('express');
const cors = require('cors');
const PORT = 3001;

const app = express();

app.use(cors());

app.get('/api/home', (req, res) => {
  res.json({ message: 'Sent to console.' });
});

app.listen(PORT, () => {
  console.log('Server started on', PORT);
});
