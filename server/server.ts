import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import pool from './db/database/db';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { getErrorMessage } from './src/functions/getErrorMessage';
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

  // admin-home methods

  app.get('/admin/admin-home', (request, response) => {
    response.json({ message: 'This is the admin home panel' });
  });

  // admin-merch methods

    // upload merch image
  const storage = multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null, './uploads');
    },
    filename: function (request, file, callback) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage });

    // create merch
  app.post('/admin/admin-merch', async (request, response) => {
    try {
      const { name, description, image, price } = request.body;
      const newMerch = await pool.query(
        "INSERT INTO merch (name, description, image, price) VALUES($1, $2, $3, $4) RETURNING *", 
        [name, description, image, price]
      );

      response.json(newMerch.rows[0]);

    } catch (err) {
      console.error(getErrorMessage(err));
    }
  });

    // get all merch
  app.get('/admin/admin-merch', async (request, response) => {
    try {
      const allMerch = await pool.query(
        "SELECT * FROM merch"
      );

      response.json(allMerch.rows);

    } catch (err) {
      console.error(getErrorMessage(err));
    }
  });

    // get one merch
  app.get('/admin/admin-merch/:id', async (request, response) => {
    try {
      const { id } = request.params;
      const merch = await pool.query(
        "SELECT * FROM merch WHERE id = $1", [id]
      );

      response.json(merch.rows[0]);

    } catch (err) {
      console.error(getErrorMessage(err));
    }
  });

    // update a merch
  app.put('/admin/admin-merch/:id', async (request, response) => {
    try {
      const { id } = request.params;
      const { name, description, image, price } = request.body;
      const updateMerch = await pool.query(
        "UPDATE merch SET name = $1, description = $2, image = $3, price = $4 WHERE id = $5",
        [name, description, image, price, id]
      );
  
      response.json("Merch was uploaded!");
  
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  });

    // delete a merch
  app.delete('/admin/admin-merch/:id', async (request, response) => {
    try {
      const { id } = request.params;
      const deleteMerch = await pool.query(
        "DELETE FROM merch WHERE id = $1", [id]
      );
  
      response.json("Merch was deleted!");
  
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  })


  // client-side merch methods



  // admin-events methods

  app.get('/admin/admin-events', (request, response) => {
    response.json({ message: 'This is the admin events panel' });
  });

  app.listen(PORT, () => {
    console.log('Server started on', PORT);
  });
}

serverStart();
