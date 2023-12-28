import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import pool from './db/database/db';
import express from 'express';
import cors from 'cors';
const PORT = 3001;

async function serverStart() {
  const app = express();
  const connection = await pool.connect();

  app
    .use(
      cors({
        credentials: true,
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200,
      })
    )
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .post('/signup', async (request, response) => {
      const { fname, lname, email, password } = request.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const { rows } = await connection.query(
        'INSERT INTO users(fname, lname, email, password) VALUES ($1, $2, $3, $4) RETURNING id, email',
        [fname, lname, email, hashedPassword]
      );
      response.json({ createdUser: rows[0] });
    })
    .post('/login', async (request, response) => {
      const { email, password } = request.body;
      const { rows } = await connection.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      
      if (rows.length === 0) {
        response
          .status(401)
          .json({ message: 'Your Email or Password is Incorrect' });
      } else {
        const correctPassword = await bcrypt.compare(
          password,
          rows[0].password
        );
        if (correctPassword) {
          const token = jwt.sign(
            { userId: rows[0].id, email: rows[0].email },
            'secret',
            { expiresIn: '10m' }
          );
          response.json({ token });
        } else {
          response
            .status(401)
            .json({ message: 'Your Email or Password is incorrect' });
        }
      }
    });
  const randomName = faker.person.fullName(); // Rowan Nikolaus
  const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

  console.log(randomName, randomEmail);

  app.get('/api/home', (request, response) => {
    response.json({ message: 'Sent to console.' });
  });

  app.get('/db/test', (request, response) => {
    response.json({ message: pool });
  });

  app.get('/admin/admin-home', (request, response) => {
    response.json({ message: 'This is the admin home panel' });
  });

  app.get('/admin/admin-merch', (request, response) => {
    response.json({ message: 'This is the admin merch panel' });
  });

  app.get('/admin/admin-events', (request, response) => {
    response.json({ message: 'This is the admin events panel' });
  });

  app.listen(PORT, () => {
    console.log('Server started on', PORT);
  });
}

serverStart();
