import { faker } from '@faker-js/faker';
import pool from './db/database/db';
import express from 'express';
import cors from 'cors';
const PORT = 3001;

const app = express();

app.use(cors());

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

console.log(randomName, randomEmail);

app.get('/api/home', (req, res) => {
  res.json({ message: 'Sent to console.' });
});

app.get('/db/test', (req, res) => {
  res.json({ message: pool });
});

app.listen(PORT, () => {
  console.log('Server started on', PORT);
});
