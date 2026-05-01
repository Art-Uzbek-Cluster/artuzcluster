import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, saveCurrentUser } from "../utils/auth";

/**
 * Login Page Component
 * Handles user login with email and password
 */
export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await loginUser(email, password);
    setIsLoading(false);

    if (result.success && result.data) {
      saveCurrentUser(result.data);
      setMessage({ type: "success", text: result.message });
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } else {
      setMessage({ type: "error", text: result.message });
    }
  };

  const handleTelegramLogin = () => {
    // TODO: Implement Telegram OAuth
    console.log("Telegram login clicked");
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log("Google login clicked");
  };

  const handleMailRuLogin = () => {
    // TODO: Implement Mail.ru OAuth
    console.log("Mail.ru login clicked");
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-hero">
          <span className="eyebrow">Вход</span>
          <h1>Войдите в Milly Art. Cluster</h1>
          <p>
            Авторизуйтесь быстро через почту или социальные сети, чтобы попасть
            в творческое сообщество.
          </p>
        </div>

        <div className="form-container auth-form">
          {message && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}

          <form onSubmit={handleSubmit}>
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

            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="submit-button"
            >
              {isLoading ? "Входим..." : "Войти"}
            </button>
          </form>

          <div className="divider">или</div>

          <div className="social-grid">
            <button
              className="btn-social btn-telegram"
              onClick={handleTelegramLogin}
              disabled={isLoading}
            >
              <span>📱</span>
              Telegram
            </button>
            <button
              className="btn-social btn-google"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <span>🔵</span>
              Google
            </button>
            <button
              className="btn-social btn-mailru"
              onClick={handleMailRuLogin}
              disabled={isLoading}
            >
              <span>📧</span>
              Mail.ru
            </button>
          </div>

          <div className="link-container">
            Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
