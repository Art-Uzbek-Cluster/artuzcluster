import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, saveCurrentUser } from '../utils/auth';
import { useLocale } from '../i18n';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLocale();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const result = await loginUser(email, password);
    setIsLoading(false);

    if (result.success && result.data) {
      saveCurrentUser(result.data);
      setMessage({ type: 'success', text: result.message || t.login.success });
      setTimeout(() => {
        navigate('/');
      }, 1200);
    } else {
      setMessage({ type: 'error', text: result.message || t.login.errorInvalid });
    }
  };

  const handleTelegramLogin = () => {
    console.log('Telegram login clicked');
  };

  const handleGoogleLogin = () => {
    console.log('Google login clicked');
  };

  const handleMailRuLogin = () => {
    console.log('Mail.ru login clicked');
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-hero">
          <span className="eyebrow">{t.login.eyebrow}</span>
          <h1>{t.login.title}</h1>
          <p>{t.login.description}</p>
        </div>

        <div className="form-container auth-form">
          {message && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{t.login.email}</label>
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
              <label htmlFor="password">{t.login.password}</label>
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
              {isLoading ? t.login.submitting : t.login.submit}
            </button>
          </form>

          <div className="divider">{t.login.or}</div>

          <div className="social-grid">
            <button
              className="btn-social btn-telegram"
              onClick={handleTelegramLogin}
              disabled={isLoading}
            >
              <span>📱</span>
              {t.login.telegram}
            </button>
            <button
              className="btn-social btn-google"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <span>🔵</span>
              {t.login.google}
            </button>
            <button
              className="btn-social btn-mailru"
              onClick={handleMailRuLogin}
              disabled={isLoading}
            >
              <span>📧</span>
              {t.login.mailru}
            </button>
          </div>

          <div className="link-container">
            {t.login.noAccount} <Link to="/register">{t.login.registerLink}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
