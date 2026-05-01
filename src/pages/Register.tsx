import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../utils/auth";

/**
 * Register Page Component
 * Handles user registration with username, email, and password
 */
export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    // Validate passwords match
    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Пароли не совпадают" });
      setIsLoading(false);
      return;
    }

    // Validate username
    if (username.length < 3) {
      setMessage({
        type: "error",
        text: "Имя пользователя должно содержать минимум 3 символа",
      });
      setIsLoading(false);
      return;
    }

    const result = await registerUser(username, email, password);
    setIsLoading(false);

    if (result.success) {
      setMessage({ type: "success", text: result.message });
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setMessage({ type: "error", text: result.message });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-hero">
          <span className="eyebrow">Регистрация</span>
          <h1>Добро пожаловать в Milly Art. Cluster</h1>
          <p>Создайте профиль и начните свой путь в творческом сообществе.</p>
        </div>

        <div className="form-container auth-form">
          {message && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Имя пользователя</label>
              <input
                id="username"
                type="text"
                placeholder="Введите имя пользователя"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                minLength={3}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Электронная почта</label>
              <input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="password">Пароль</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Минимум 6 символов"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              <div className="form-group half">
                <label htmlFor="confirmPassword">Подтвердите пароль</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="submit-button">
              {isLoading ? "Регистрируемся..." : "Зарегистрироваться"}
            </button>
          </form>

          <div className="link-container">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
