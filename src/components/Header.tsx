import { Link } from "react-router-dom";
import { useState } from "react";
import { useLocale } from "../i18n";

/**
 * Header Component
 * Navigation header with logo and page anchors
 */
export function Header() {
  const { locale, theme, setLocale, toggleTheme, t } = useLocale();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  return (
    <header>
      <div className="container header-inner">
        <Link to="/" className="brand-link">
          <span className="brand-logo">{t.header.logo}</span>
        </Link>

        <nav className="header-nav">
          <a href="#about">{t.header.nav.about}</a>
          <a href="#directions">{t.header.nav.directions}</a>
          <a href="#projects">{t.header.nav.projects}</a>
          <a href="#news">{t.header.nav.news}</a>
          <a href="#contact">{t.header.nav.contact}</a>
        </nav>

        <div className="header-actions">
          <div className="header-controls">
            <div className="lang-menu-wrapper">
              <button
                className="lang-menu-trigger"
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                aria-expanded={isLangMenuOpen}
              >
                {locale === "uz" ? "🇺🇿 UZ" : "🇷🇺 RU"}
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                  <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
              {isLangMenuOpen && (
                <div className="lang-menu-dropdown">
                  <button
                    className={`lang-menu-item ${locale === "uz" ? "active" : ""}`}
                    onClick={() => {
                      setLocale("uz");
                      setIsLangMenuOpen(false);
                    }}
                  >
                    🇺🇿 O'zbekcha
                  </button>
                  <button
                    className={`lang-menu-item ${locale === "ru" ? "active" : ""}`}
                    onClick={() => {
                      setLocale("ru");
                      setIsLangMenuOpen(false);
                    }}
                  >
                    🇷🇺 Русский
                  </button>
                </div>
              )}
            </div>
            <button className="theme-button" onClick={toggleTheme}>
              {theme === "dark" ? "🌞 " : "🌙 "}
              {theme === "dark" ? t.header.theme.light : t.header.theme.dark}
            </button>
          </div>

          {/* Auth links removed */}
        </div>
      </div>
    </header>
  );
}
