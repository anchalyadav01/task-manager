// backend/index.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 5000;

// MySQL root credentials
const DB_USER = 'root';
const DB_PASSWORD = 'Anchal@01';
const DB_NAME = 'task_manager';

// Middleware
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: DB_USER,
  password: DB_PASSWORD,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL');

  // Create database if not exists
  db.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME}`, (err) => {
    if (err) {
      console.error('❌ Error creating database:', err.message);
      return;
    }
    console.log(`✅ Database "${DB_NAME}" ready`);

    // Use the database
    db.changeUser({ database: DB_NAME }, (err) => {
      if (err) {
        console.error('❌ Error switching database:', err.message);
        return;
      }
      console.log(`✅ Using database "${DB_NAME}"`);

      // Create tasks table if not exists
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS tasks (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `;
      db.query(createTableQuery, (err) => {
        if (err) {
          console.error('❌ Error creating tasks table:', err.message);
          return;
        }
        console.log('✅ Tasks table ready');
      });
    });
  });
});

// Routes

// Test DB connection
app.get('/test-db', (req, res) => {
  db.query('SELECT NOW() AS time', (err, result) => {
    if (err) return res.send('DB Error: ' + err.message);
    res.send('DB Connected! Server Time: ' + result[0].time);
  });
});

// Get all tasks
app.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  console.log('POST /tasks:', req.body); // Log request

  db.query(
    'INSERT INTO tasks (title, description) VALUES (?, ?)',
    [title, description],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Task added successfully!' });
    }
  );
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id=?', [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'Task deleted successfully!' });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});
