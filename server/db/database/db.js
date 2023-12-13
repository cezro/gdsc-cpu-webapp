const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT),
});

console.log(
  process.env.DATABASE_USER,
  process.env.DATABASE_HOST,
  process.env.DATABASE_NAME,
  process.env.DATABASE_PASSWORD,
  process.env.DATABASE_PORT,
  'did it work'
);
