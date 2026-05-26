import express from "express";
import cors from "cors";
let sqlite3;
try {
  // try to load native sqlite3; may fail on mismatched binaries
  // eslint-disable-next-line global-require
  sqlite3 = (await import('sqlite3')).default;
} catch (e) {
  console.warn('sqlite3 native module failed to load, falling back to in-memory DB:', e && e.message);
  sqlite3 = null;
}
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let db;
if (sqlite3) {
  const dbFile = `${__dirname}/database.sqlite`;
  db = new sqlite3.Database(dbFile, (error) => {
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
    )`,
    );
  });
} else {
  // simple in-memory fallback implementing minimal sqlite3 API used by this server
  const users = [];
  db = {
    serialize(fn) {
      if (typeof fn === 'function') fn();
    },
    run(sql, params, cb) {
      try {
        if (sql && sql.toString().toUpperCase().includes('CREATE TABLE')) {
          // no-op for create table
          if (cb) cb(null);
          return;
        }

        if (sql && sql.toString().toUpperCase().startsWith('INSERT')) {
          const id = users.length + 1;
          users.push({ id, username: params[0], email: params[1], password: params[2] });
          if (cb) cb.call({ lastID: id }, null);
          return;
        }

        if (cb) cb(null);
      } catch (err) {
        if (cb) cb(err);
      }
    },
    get(sql, params, cb) {
      try {
        const q = sql.toString().toUpperCase();
        if (q.includes('SELECT ID FROM USERS WHERE EMAIL')) {
          const user = users.find((u) => u.email === params[0]);
          cb(null, user ? { id: user.id } : undefined);
          return;
        }

        if (q.includes('SELECT ID, USERNAME, EMAIL, PASSWORD FROM USERS WHERE EMAIL')) {
          const user = users.find((u) => u.email === params[0]);
          cb(null, user || undefined);
          return;
        }

        cb(null, undefined);
      } catch (err) {
        cb(err);
      }
    },
  };
}

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const getMessage = (locale, key) => {
  const messages = {
    uz: {
      fieldsMissing: "Barcha maydonlar to'ldirilishi kerak",
      usernameShort:
        "Foydalanuvchi nomi kamida 3 ta belgidan iborat bo'lishi kerak",
      emailInvalid: "Noto'g'ri elektron pochta manzili",
      passwordShort: "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
      serverError: "Server xatosi",
      exists: "Bunday email bilan foydalanuvchi allaqachon ro'yxatdan o'tgan",
      registerSuccess: "Ro'yxatdan o'tish muvaffaqiyatli!",
      registerError: "Ro'yxatdan o'tish xatosi",
      fillAll: "Iltimos, barcha maydonlarni to'ldiring",
      loginError: "Noto'g'ri email yoki parol",
      loginSuccess: "Kirish muvaffaqiyatli amalga oshirildi!",
    },
    ru: {
      fieldsMissing: "Пожалуйста, заполните все поля",
      usernameShort: "Имя пользователя должно содержать минимум 3 символа",
      emailInvalid: "Некорректный адрес электронной почты",
      passwordShort: "Пароль должен содержать минимум 6 символов",
      serverError: "Ошибка сервера",
      exists: "Пользователь с таким email уже зарегистрирован",
      registerSuccess: "Регистрация успешна!",
      registerError: "Ошибка регистрации",
      fillAll: "Пожалуйста, заполните все поля",
      loginError: "Некорректный email или пароль",
      loginSuccess: "Вход выполнен успешно!",
    },
  };

  return messages[locale] || messages.uz;
};

const resolveLocale = (req) => {
  const header = req.headers["accept-language"];
  return header && header.toString().startsWith("ru") ? "ru" : "uz";
};

app.post("/api/register", (req, res) => {
  const { username, email, password } = req.body;
  const locale = resolveLocale(req);

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: getMessage(locale, "fieldsMissing"),
    });
  }

  if (username.trim().length < 3) {
    return res.status(400).json({
      success: false,
      message: getMessage(locale, "usernameShort"),
    });
  }

  if (!validateEmail(email)) {
    return res.status(400).json({
      success: false,
      message: getMessage(locale, "emailInvalid"),
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: getMessage(locale, "passwordShort"),
    });
  }

  db.get("SELECT id FROM users WHERE email = ?", [email], (err, row) => {
    if (err) {
      return res
        .status(500)
        .json({ success: false, message: getMessage(locale, "serverError") });
    }

    if (row) {
      return res.status(409).json({
        success: false,
        message: getMessage(locale, "exists"),
      });
    }

    db.run(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username.trim(), email.trim().toLowerCase(), password],
      function (insertError) {
        if (insertError) {
          return res
            .status(500)
            .json({
              success: false,
              message: getMessage(locale, "registerError"),
            });
        }

        return res.json({
          success: true,
          message: getMessage(locale, "registerSuccess"),
          data: { id: this.lastID, username, email },
        });
      },
    );
  });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const locale = resolveLocale(req);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: getMessage(locale, "fillAll"),
    });
  }

  db.get(
    "SELECT id, username, email, password FROM users WHERE email = ?",
    [email.trim().toLowerCase()],
    (err, row) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: getMessage(locale, "serverError") });
      }

      if (!row || row.password !== password) {
        return res
          .status(401)
          .json({ success: false, message: getMessage(locale, "loginError") });
      }

      return res.json({
        success: true,
        message: getMessage(locale, "loginSuccess"),
        data: { id: row.id, username: row.username, email: row.email },
      });
    },
  );
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Backend API server running on http://localhost:${PORT}`);
});
