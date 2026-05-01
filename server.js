import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const dbFile = `${__dirname}/database.sqlite`;
const db = new sqlite3.Database(dbFile, (error) => {
  if (error) {
    console.error('Unable to open database:', error);
    process.exit(1);
  }
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )`
  );
});

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ success: false, message: 'Все поля должны быть заполнены' });
  }

  if (username.trim().length < 3) {
    return res.status(400).json({ success: false, message: 'Имя пользователя должно содержать минимум 3 символа' });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({ success: false, message: 'Некорректный адрес электронной почты' });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: 'Пароль должен содержать минимум 6 символов' });
  }

  db.get('SELECT id FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }

    if (row) {
      return res.status(409).json({ success: false, message: 'Пользователь с таким email уже зарегистрирован' });
    }

    db.run(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username.trim(), email.trim().toLowerCase(), password],
      function (insertError) {
        if (insertError) {
          return res.status(500).json({ success: false, message: 'Ошибка регистрации' });
        }

        return res.json({ success: true, message: 'Регистрация успешна!', data: { id: this.lastID, username, email } });
      }
    );
  });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Пожалуйста, заполните все поля' });
  }

  db.get('SELECT id, username, email, password FROM users WHERE email = ?', [email.trim().toLowerCase()], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Ошибка сервера' });
    }

    if (!row || row.password !== password) {
      return res.status(401).json({ success: false, message: 'Некорректный email или пароль' });
    }

    return res.json({
      success: true,
      message: 'Вход выполнен успешно!',
      data: { id: row.id, username: row.username, email: row.email },
    });
  });
});

app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Backend API server running on http://localhost:${PORT}`);
});
