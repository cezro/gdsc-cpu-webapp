import { faker } from '@faker-js/faker';
import pool from './db/database/db';

async function seed() {
  const connection = await pool.connect();

  for (let i = 0; i < 30; i++) {
    const randomFName = faker.person.firstName();
    const randomLName = faker.person.lastName();
    const randomEmail = faker.internet.email();
    const password = 1234;

    const query =
      'INSERT INTO users (fname, lname, email, password) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [randomFName, randomLName, randomEmail, password];

    connection.query(query, values);
  }
}

seed();
