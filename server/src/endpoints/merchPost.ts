import path from 'path';
import pool from '../../db/database/db';

export default async function merchPost(request, response) {
  try {
    if (!request.file) {
      return response.status(400).json({ error: 'No image provided' });
    }

    const filePath = path.join('uploads', 'merch-image', request.file.filename);
    const { name, description, price } = request.body;

    const query =
      'INSERT INTO merch (name, description, image, price) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [name, description, filePath, price];

    const newMerch = await pool.query(query, values);

    // response.json(newMerch.rows[0]);
    return response.status(200).json({ success: true, data: newMerch.rows[0] });
  } catch (err) {
    // console.error(getErrorMessage(err));
    console.error('Error uploading image', err);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}
