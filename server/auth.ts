import jwt from 'jsonwebtoken'
import pool from './db/database/db';
import { getErrorMessage } from './src/functions/getErrorMessage';

async function authenticateToken(request, response, next) {
  const connection = await pool.connect()

  const authHeader = request.header('Authorization');
      const token = authHeader?.split(' ')[1];

      if (!token) {
        response.status(401).json({ message: 'Not authenticated' });
        return;
      }
      let userData;
      try {
        const claims = jwt.verify(token, String(process.env.TOKEN_SECRET));
        const userId = claims
        const { rows } = await connection.query(
          'SELECT id, email FROM users WHERE id = $1',
          [userId]
        );
        userData = { me: rows[0] };
        console.log(userData)
        next()
      } catch (err) {
        console.error(getErrorMessage(err));
      }
}

export default authenticateToken


