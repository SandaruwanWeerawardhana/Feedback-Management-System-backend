import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const dbName = process.env.DB_NAME || 'feedback';

let db;

export const dbInit = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '', 
      multipleStatements: true,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database '${dbName}' ensured.`);

    db = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',  
      database: dbName,
    });

    await db.query(`
      CREATE TABLE IF NOT EXISTS feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        rating INT NOT NULL CHECK(rating BETWEEN 1 AND 5),
        comments TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Feedback table ensured.');
  } catch (err) {
    console.error('DB init error:', err);
  }
};

export const getDb = () => db;
