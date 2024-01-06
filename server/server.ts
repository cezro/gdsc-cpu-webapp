/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import pool from './db/database/db';
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { getErrorMessage } from './src/functions/getErrorMessage';
import defineStorage from './src/functions/defineStorage';
import upload from './src/functions/upload';
import validate from './src/functions/validate';
import { loginSchema, userSchema } from './schemas/user';
import { merchSchema } from './schemas/merch';
import { eventSchema } from './schemas/events';
const PORT = 3001;

async function serverStart() {
  const app = express();
  const connection = await pool.connect();

  async function authenticateToken(request, response, next) {
    const authHeader = request.header('Authorization');
    const token = authHeader?.split(' ')[1];

    if (!token) {
      response.status(401).json({ message: 'Not authenticated' });
      return;
    }
    let userData;
    try {
      const claims = jwt.verify(
        token,
        String(process.env.TOKEN_SECRET)
      ) as jwt.JwtPayload;
      const userId = claims.userId;
      const { rows } = await connection.query(
        'SELECT id, email FROM users WHERE id = $1',
        [userId]
      );
      userData = { me: rows[0] };
      console.log(userData);
      request.userId = userId;

      next();
    } catch (err) {
      console.error(getErrorMessage(err));
    }
  }

  // multer image upload
  const merchImageDir = './uploads/merch-image';
  const eventsImageDir = './uploads/events-image';
  const preOrderReceiptsDir = './uploads/pre-order-receipts';

  if (!fs.existsSync(merchImageDir)) {
    fs.mkdirSync(merchImageDir, { recursive: true });
  }

  if (!fs.existsSync(eventsImageDir)) {
    fs.mkdirSync(eventsImageDir, { recursive: true });
  }

  if (!fs.existsSync(preOrderReceiptsDir)) {
    fs.mkdirSync(preOrderReceiptsDir, { recursive: true });
  }

  const merchImageStorage = defineStorage(merchImageDir);
  const eventsImageStorage = defineStorage(eventsImageDir);
  const preOrderReceiptsStorage = defineStorage(preOrderReceiptsDir);

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
      const isValid = validate(userSchema, { fname, lname, email, password })
        ?.valid;
      if (isValid) {
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
      }
    })
    .post('/login', async (request, response) => {
      const { email, password } = request.body;
      const isValid = validate(loginSchema, { email, password })?.valid;
      if (isValid) {
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
      }
    })
    .get('/admin/admin-home', authenticateToken, async (request, response) => {
      // admin-home methods
      let allMembers;
      try {
        const { rows: memberRows } = await connection.query(
          'SELECT * FROM users'
        );
        allMembers = memberRows;
      } catch (err) {
        console.error(getErrorMessage(err));
        response
          .status(500)
          .json({ message: 'An error occurred while fetching members' });
        return;
      }

      console.log(allMembers);
      response.json({ allMembers });
    })
    .delete(
      '/admin/admin-home/:id',
      authenticateToken,
      async (request, response) => {
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
      }
    )
    .use(
      // admin-merch methods
      '/uploads/merch-image',
      express.static(path.join('uploads', 'merch-image'))
    )
    .post(
      '/admin/admin-merch',
      authenticateToken,
      upload(merchImageStorage).single('image'),
      async (request, response) => {
        try {
          if (!request.file) {
            return response.status(400).json({ error: 'No image provided' });
          }

          const filePath = path.join(
            'uploads',
            'merch-image',
            request.file.filename
          );
          const { name, description, price } = request.body;
          const isValid = validate(merchSchema, { name, description, price });

          if (isValid) {
            const query =
              'INSERT INTO merch (name, description, image, price) VALUES ($1, $2, $3, $4) RETURNING *';
            const values = [name, description, filePath, price];

            const newMerch = await pool.query(query, values);

            // response.json(newMerch.rows[0]);
            return response
              .status(200)
              .json({ success: true, data: newMerch.rows[0] });
          }
        } catch (err) {
          // console.error(getErrorMessage(err));
          console.error('Error uploading image', err);
          return response.status(500).json({ error: 'Internal Server Error' });
        }
      }
    )
    .get('/admin/admin-merch', authenticateToken, async (request, response) => {
      const userId = (request as any).userId;

      // get all merch
      let allMerches;
      try {
        const { rows: merchRows } = await connection.query(
          'SELECT * FROM merch'
        );
        allMerches = merchRows;
      } catch (err) {
        console.error(getErrorMessage(err));
      }

      response.json({ allMerches, userId });
    })
    .get(
      '/admin/admin-merch/:id',
      authenticateToken,
      async (request, response) => {
        // get one merch
        try {
          const { id } = request.params;
          const merch = await pool.query('SELECT * FROM merch WHERE id = $1', [
            id,
          ]);

          response.json(merch.rows[0]);
        } catch (err) {
          console.error(getErrorMessage(err));
        }
      }
    )
    .put(
      '/admin/admin-merch/:id',
      authenticateToken,
      async (request, response) => {
        // update a merch
        try {
          const { id } = request.params;
          const { name, description, price } = request.body;
          const updateMerch = await pool.query(
            'UPDATE merch SET name = $1, description = $2, price = $3 WHERE id = $4',
            [name, description, price, id]
          );

          response.json('Merch was uploaded!');
        } catch (err) {
          console.error(getErrorMessage(err));
        }
      }
    )
    .delete(
      '/admin/admin-merch/:id',
      authenticateToken,
      async (request, response) => {
        // delete a merch
        try {
          const { id } = request.params;
          const deleteMerch = await pool.query(
            'DELETE FROM merch WHERE id = $1',
            [id]
          );

          response.json('Merch was deleted!');
        } catch (err) {
          console.error(getErrorMessage(err));
        }
      }
    ) // pre-order-form methods
    .post('/pre-order-form', authenticateToken, async (request, response) => {
      try {
        const {
          user_id,
          shipping_province,
          shipping_city,
          shipping_street,
          shipping_house_number,
          merch_id,
          merch_quantity,
          date_time_submitted,
        } = request.body;

        const query = `INSERT INTO pre_order_forms 
              (user_id, shipping_province, shipping_city, shipping_street, shipping_house_number, merch_id, merch_quantity, date_time_submitted) 
              VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
              RETURNING *`;
        const values = [
          user_id,
          shipping_province,
          shipping_city,
          shipping_street,
          shipping_house_number,
          merch_id,
          // gcash_receipt,
          merch_quantity,
          date_time_submitted,
        ];

        const newMerch = await pool.query(query, values);

        response.status(200).json({ success: true, data: newMerch.rows[0] });
      } catch (err) {
        // console.error(getErrorMessage(err));
        console.error('Error uploading image', err);
        return response.status(500).json({ error: 'Internal Server Error' });
      }
    })
    .get('/pre-order-form', authenticateToken, async (request, response) => {
      const userId = (request as any).userId;

      // get all pre-orders
      let allPreOrders;
      try {
        const { rows: preOrderRows } = await connection.query(
          'SELECT * FROM pre_order_forms'
        );
        allPreOrders = preOrderRows;
      } catch (err) {
        console.error(getErrorMessage(err));
      }

      response.json({ allPreOrders, userId });
    })
    .get(
      '/pre-order-form-merch-join',
      authenticateToken,
      async (request, response) => {
        // get all pre-orders
        let allMerchStats;
        try {
          const { rows: merchPreOrderRows } = await connection.query(
            `SELECT merch.name, pre_order_forms.merch_quantity, users.fname, users.lname, users.email, 
          pre_order_forms.shipping_province, pre_order_forms.shipping_city, pre_order_forms.shipping_street, 
          pre_order_forms.shipping_house_number, pre_order_forms.date_time_submitted
          FROM pre_order_forms 
          RIGHT JOIN merch ON 
          pre_order_forms.merch_id = merch.id
          LEFT JOIN users ON 
          pre_order_forms.user_id = users.id`
          );
          allMerchStats = merchPreOrderRows;
        } catch (err) {
          console.error(getErrorMessage(err));
        }

        response.json({ allMerchStats });
      }
    )
    .delete(
      '/pre-order-form/:id',
      authenticateToken,
      async (request, response) => {
        // delete a pre-order-form
        try {
          const { id } = request.params;
          const deletePreOrderForm = await pool.query(
            'DELETE FROM pre_order_forms WHERE id = $1',
            [id]
          );

          response.json('Pre-Order Form was deleted!');
        } catch (err) {
          console.error(getErrorMessage(err));
        }
      }
    )
    .use(
      // admin-events methods
      '/uploads/events-image',
      express.static(path.join('uploads', 'events-image'))
    )
    .post(
      '/admin/admin-events',
      authenticateToken,
      upload(eventsImageStorage).single('image'),
      async (request, response) => {
        try {
          if (!request.file) {
            return response.status(400).json({ error: 'No image provided' });
          }

          const filePath = path.join(
            'uploads',
            'events-image',
            request.file.filename
          );
          const { name, description, date, time, location } = request.body;
          const isValid = validate(eventSchema, {
            name,
            description,
            date,
            time,
            location,
          })?.valid;
          if (isValid) {
            const query =
              'INSERT INTO events (name, description, image, date, time, location) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
            const values = [name, description, filePath, date, time, location];

            const newEvent = await pool.query(query, values);

            // response.json(newEvent.rows[0]);
            return response
              .status(200)
              .json({ success: true, data: newEvent.rows[0] });
          }
        } catch (err) {
          // console.error(getErrorMessage(err));
          console.error('Error uploading image', err);
          return response.status(500).json({ error: 'Internal Server Error' });
        }
      }
    )
    .get(
      '/admin/admin-events',
      authenticateToken,
      async (request, response) => {
        // get all events
        let allEvents;
        try {
          const { rows: eventRows } = await connection.query(
            'SELECT * FROM events'
          );
          allEvents = eventRows;
        } catch (err) {
          console.error(getErrorMessage(err));
        }

        response.json({ allEvents });
      }
    )
    .get(
      '/admin/admin-events/:id',
      authenticateToken,
      async (request, response) => {
        // get one event
        try {
          const { id } = request.params;
          const event = await pool.query('SELECT * FROM event WHERE id = $1', [
            id,
          ]);

          response.json(event.rows[0]);
        } catch (err) {
          console.error(getErrorMessage(err));
        }
      }
    )
    .put(
      '/admin/admin-events/:id',
      authenticateToken,
      async (request, response) => {
        // update an event
        try {
          const { id } = request.params;
          const { name, description, date, time, location } = request.body;
          const updateEvent = await pool.query(
            'UPDATE events SET name = $1, description = $2, date = $3, time = $4, location = $5 WHERE id = $6',
            [name, description, date, time, location, id]
          );

          response.json('Event was uploaded!');
        } catch (err) {
          console.error(getErrorMessage(err));
        }
      }
    )
    .delete(
      '/admin/admin-events/:id',
      authenticateToken,
      async (request, response) => {
        // delete an event
        try {
          const { id } = request.params;
          const deleteEvent = await pool.query(
            'DELETE FROM events WHERE id = $1',
            [id]
          );

          response.json('Merch was deleted!');
        } catch (err) {
          console.error(getErrorMessage(err));
        }
      }
    )
    .listen(PORT, () => {
      console.log('Server started on', PORT);
    });
}

serverStart();
