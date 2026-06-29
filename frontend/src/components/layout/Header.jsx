import { Link } from 'react-router-dom';
import { FiMoon, FiSun } from 'react-icons/fi';
import styles from './Header.module.css';

function Header({ isDark, toggleTheme }) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <div className={styles.logoIcon}>✓</div>
          <span className={styles.logoText}>Tasks</span>
        </Link>

        <nav className={styles.nav}>
          <Link to="/" className={styles.navLink}>
            Home
          </Link>
          <Link to="/statistics" className={styles.navLink}>
            Statistics
          </Link>
        </nav>

        <button
          className={styles.themeToggle}
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
