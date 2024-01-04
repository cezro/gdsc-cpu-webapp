import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import pool from './db/database/db';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
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
      const { rows: existingRows } = await connection.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      if (existingRows.length > 0) {
        return response.status(400).json({ error: 'Email already in use' });
      }
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
            String(process.env.TOKEN_SECRET),
            { expiresIn: '1h' }
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

  app
    .get('/admin/admin-home', async (request, response) => {
      const authHeader = request.header('Authorization');
      const token = authHeader?.split('')[1];

      if (!token) {
        response.status(401).json({ message: 'Not authenticated' });
        return;
      }

      let userData;
      let allMembers;

      try {
        const claims = jwt.verify(token, String(process.env.TOKEN_SECRET));
        const userId = claims as any;
        const { rows } = await connection.query(
          'SELECT id, email FROM users WHERE id = $1',
          [userId]
        );
        userData = { me: rows[0] };
      } catch (err) {
        console.error(getErrorMessage(err));
      }

      try {
        const { rows: memberRows } = await connection.query(
          'SELECT * FROM users'
        );
        allMembers = memberRows;
      } catch (err) {
        console.error(getErrorMessage(err));
      }

      console.log(allMembers);
      response.json({ userData, allMembers });
    })
    .delete('/admin/admin-home/:id', async (request, response) => {
      try {
        const { id } = await request.params;
        const deleteMember = await pool.query(
          'DELETE FROM users WHERE id = $1',
          [id]
        );
        response.json({ message: 'Member was removed!' });
      } catch (err) {
        console.error(getErrorMessage(err));
      }
    });

  // admin-merch methods

  // upload merch image
  const merchImageDir = './uploads/merch-image';

  if (!fs.existsSync(merchImageDir)) {
    fs.mkdirSync(merchImageDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, merchImageDir);
    },
    filename: (request, file, callback) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      callback(
        null,
        file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]
      );
    },
  });

  const upload = multer({ storage: storage });

  app.use(
    '/uploads/merch-image',
    express.static(path.join('uploads', 'merch-image'))
  );

  app.post(
    '/admin/admin-merch',
    upload.single('image'),
    async (request, response) => {
      try {
        if (!request.file) {
          return response.status(400).json({ error: 'No image provided' });
        }

        // // Resize the image
        // const resizedImagePath = path.join('uploads', 'merch-image', 'resized', request.file.filename);
        // await sharp(request.file.path)
        //   .resize(500, 500) // width, height
        //   .toFile(resizedImagePath);

        // Save the file path in the database
        const filePath = path.join(
          'uploads',
          'merch-image',
          request.file.filename
        );
        const { name, description, price } = request.body;

        const query =
          'INSERT INTO merch (name, description, image, price) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, description, filePath, price];

        const newMerch = await pool.query(query, values);

        // response.json(newMerch.rows[0]);
        return response
          .status(200)
          .json({ success: true, data: newMerch.rows[0] });
      } catch (err) {
        // console.error(getErrorMessage(err));
        console.error('Error uploading image', err);
        return response.status(500).json({ error: 'Internal Server Error' });
      }
    }
  );

  // get all merch
  app.get('/admin/admin-merch', async (request, response) => {
    const authHeader = request.header('Authorization');
    const token = authHeader?.split('')[1];

    if (!token) {
      return response.status(401).json({ message: 'Not authenticated' });
    }

    let userData;
    let allMerches;

    try {
      const claims = jwt.verify(token, String(process.env.TOKEN_SECRET));
      const userId = claims as any;
      const { rows } = await connection.query(
        'SELECT id, email FROM users WHERE id = $1',
        [userId]
      );
      userData = { me: rows[0] };
    } catch (err) {
      console.error(getErrorMessage(err));
    }

    try {
      const { rows: merchRows } = await connection.query('SELECT * FROM merch');
      allMerches = merchRows;
    } catch (err) {
      console.error(getErrorMessage(err));
    }

    response.json({ userData, allMerches });
  });

  // get one merch
  app.get('/admin/admin-merch/:id', async (request, response) => {
    try {
      const { id } = request.params;
      const merch = await pool.query('SELECT * FROM merch WHERE id = $1', [id]);

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
        'UPDATE merch SET name = $1, description = $2, image = $3, price = $4 WHERE id = $5',
        [name, description, image, price, id]
      );

      response.json('Merch was uploaded!');
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  });

  // delete a merch
  app.delete('/admin/admin-merch/:id', async (request, response) => {
    try {
      const { id } = request.params;
      const deleteMerch = await pool.query('DELETE FROM merch WHERE id = $1', [
        id,
      ]);

      response.json('Merch was deleted!');
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  });

  // client-side merch methods

  // admin-events methods

  app.get('/admin/admin-events', async (request, response) => {
    const authHeader = request.header('Authorization');
    const token = authHeader?.split('')[1];

    if (!token) {
      response.status(401).json({ message: 'Not authenticated' });
      return;
    }

    try {
      const claims = jwt.verify(token, String(process.env.TOKEN_SECRET));
      const userId = claims as any;
      const { rows } = await connection.query(
        'SELECT id, email FROM users WHERE id = $1',
        [userId]
      );
      response.json({ me: rows[0] });
    } catch (err) {
      console.error(getErrorMessage(err));
    }

    response.json({ message: 'This is the admin events panel' });
  });

  app.listen(PORT, () => {
    console.log('Server started on', PORT);
  });
}

serverStart();
