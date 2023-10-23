import { readFileSync } from 'fs';
import mysql, { Connection } from 'mysql2/promise';

export function connectToDatabase() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'test123*',
    database: 'auth',
    multipleStatements: true,
  });
}

export async function injectDatabase(c: Connection) {
  return c.query(
    readFileSync('init.sql').toString()
  );
}

interface User {
  id: string;
  username: string;
  password: string;
}

export async function getUserById(c: Connection, id :string) {
    const [result] = await c.query('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
    const user = result[0];
    return user as User | undefined;
}
