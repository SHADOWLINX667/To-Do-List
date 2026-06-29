import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiBarChart2 } from 'react-icons/fi';
import styles from './Sidebar.module.css';

function Sidebar() {
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        <Link
          to="/"
          className={`${styles.navItem} ${location.pathname === '/' ? styles.active : ''}`}
        >
          <FiHome size={20} />
          <span>Home</span>
        </Link>
        <Link
          to="/statistics"
          className={`${styles.navItem} ${location.pathname === '/statistics' ? styles.active : ''}`}
        >
          <FiBarChart2 size={20} />
          <span>Statistics</span>
        </Link>
      </nav>
    </aside>
  );
}

export default Sidebar;
