import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBarChart2 } from 'react-icons/fi';
import styles from './BottomNav.module.css';

function BottomNav() {
  const location = useLocation();

  return (
    <nav className={styles.bottomNav}>
      <Link
        to="/"
        className={`${styles.navItem} ${location.pathname === '/' ? styles.active : ''}`}
      >
        <FiHome size={24} />
        <span>Home</span>
      </Link>
      <Link
        to="/statistics"
        className={`${styles.navItem} ${location.pathname === '/statistics' ? styles.active : ''}`}
      >
        <FiBarChart2 size={24} />
        <span>Stats</span>
      </Link>
    </nav>
  );
}

export default BottomNav;
