// FILEPATH: /Users/amauryd/Projects/angular-auth/auth-backend/src/main.ts

import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import { connectToDatabase, injectDatabase } from './database.js';
import { compare, hash } from 'bcrypt';
import { generateAccessToken, loggedUserId } from './jwt.js';



async function init() {
  const connection = await connectToDatabase();
  if (process.env.REGEN) {
    await injectDatabase(connection);
  }
  const app = express();

  // Middleware to parse JSON bodies
  app.use(bodyparser.json());
  app.use(cors());

  app.get('/status', (_req, res) => {
    res.json({ status: 'success' });
  });

  app.get('/users', async (req, res) => {
    const user = await loggedUserId(connection, req);

    if (!user) {
      return res.json({ status: 'error', error: 'Unauthorized' });
    }

    const [users] = await connection.query('SELECT * FROM users');
    return res.json({
      users
    });
  });

  app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const hashedPassword = await hash(password, 10);

    await connection.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    res.json({ status: 'success' });
  });

  app.get('/profile', async (req, res) => {
    const user = await loggedUserId(connection, req);

    if (!user) {
      return res.json({ status: 'error', error: 'Unauthorized' });
    }

    return res.json({
      user
    });
  });

  app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const [result] = await connection.query('SELECT * FROM users WHERE username = ? LIMIT 1', [username]);
    const user = result[0];

    if (!user) {
      return res.json({ status: 'error', error: 'Invalid username/password' });
    }

    if (await compare(password, user['password'])) {
      return res.json({
        accessToken: generateAccessToken(user['id']),
       });
    }

    return res.json({ status: 'error', error: 'Invalid username/password' });
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}

init();
