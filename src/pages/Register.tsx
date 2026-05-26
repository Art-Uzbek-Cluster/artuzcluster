import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../utils/auth';
import { useLocale } from '../i18n';

export function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: t.register.errorPasswordMismatch });
      setIsLoading(false);
      return;
    }

    if (username.length < 3) {
      setMessage({ type: 'error', text: t.register.errorUsername });
      setIsLoading(false);
      return;
    }

    const result = await registerUser(username, email, password);
    setIsLoading(false);

    if (result.success) {
      setMessage({ type: 'success', text: result.message });
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } else {
      setMessage({ type: 'error', text: result.message || 'Ошибка регистрации' });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-hero">
          <span className="eyebrow">{t.register.eyebrow}</span>
          <h1>{t.register.title}</h1>
          <p>{t.register.description}</p>
        </div>

        <div className="form-container auth-form">
          {message && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username">{t.register.username}</label>
                <input
                  id="username"
                  type="text"
                  placeholder={t.register.username}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">{t.register.email}</label>
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
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">{t.register.password}</label>
                <input
                  id="password"
                  type="password"
                  placeholder={t.register.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>

              <div className="form-group half">
                <label htmlFor="confirmPassword">{t.register.confirmPassword}</label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder={t.register.confirmPassword}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  minLength={6}
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="submit-button">
              {isLoading ? t.register.submitting : t.register.submit}
            </button>
          </form>

          <div className="link-container">
            {t.register.haveAccount} <Link to="/login">{t.register.loginLink}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
