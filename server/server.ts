import { faker } from '@faker-js/faker';
import pool from './db/database/db';
import express from 'express';
import cors from 'cors';
const PORT = 3001;

async function serverStart() {
const app = express();

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}));

const randomName = faker.person.fullName(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

console.log(randomName, randomEmail);

app.get('/api/home', (req, res) => {
  res.json({ message: 'Sent to console.' });
});

app.get('/db/test', (req, res) => {
  res.json({ message: pool });
});

app.get('/admin/admin-home', (req, res) => {
  res.json({ message: 'This is the admin home panel'})
})

app.get('/admin/admin-merch', (req, res) => {
  res.json({ message: 'This is the admin merch panel'})
})

app.get('/admin/admin-events', (req, res) => {
  res.json({ message: 'This is the admin events panel'})
})

app.listen(PORT, () => {
  console.log('Server started on', PORT);
});
}

serverStart()