import { Link } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../utils/auth';

/**
 * Header Component
 * Navigation header with logo and page anchors
 */
export function Header() {
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    window.location.href = '/';
  };

  return (
    <header>
      <div className="container header-inner">
        <Link to="/" className="brand-link">
          <span className="brand-logo">Milly Art. Cluster</span>
        </Link>

        <nav className="header-nav">
          <a href="#about">О проекте</a>
          <a href="#directions">Направления</a>
          <a href="#projects">Проекты</a>
          <a href="#experts">Эксперты</a>
          <a href="#news">Новости</a>
        </nav>

        <div className="header-actions">
          {currentUser ? (
            <>
              <span className="header-user">Привет, {currentUser.username}</span>
              <button className="logout-button" onClick={handleLogout}>
                Выход
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-link">
                Вход
              </Link>
              <Link to="/register" className="header-button">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
