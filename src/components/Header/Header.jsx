import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header({ isCollectionPage = false, transparent = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <>
      <header className={`site-header ${isCollectionPage ? 'collection-header' : ''} ${transparent ? 'transparent-header' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <Link to="/" className="header-logo">
            <img src="/images/logo.svg" alt="Dawn Martins" />
          </Link>

          {/* Hamburger button */}
          <button
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
        onClick={closeMenu}
      />

      {/* Slide Menu */}
      <nav className={`slide-menu ${isMenuOpen ? 'active' : ''}`}>
        <div className="slide-menu-content">
          <ul className="menu-links">
            <li>
              <Link
                to="/"
                onClick={closeMenu}
                className={location.pathname === '/' ? 'active' : ''}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                to="/collections"
                onClick={closeMenu}
                className={location.pathname === '/collections' ? 'active' : ''}
              >
                Collections
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={closeMenu}
                className={location.pathname === '/about' ? 'active' : ''}
              >
                A propos
              </Link>
            </li>
          </ul>

          <div className="menu-footer">
            <div className="social-links">
              <a
                href="https://instagram.com/dawnmartinsparis/"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.tiktok.com/@dawnmartinsparis"
                target="_blank"
                rel="noreferrer"
                className="social-link"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
            </div>
            <div className="menu-copyright">
              © 2026 Dawn Martins
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
