import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';
import styles from './Layout.module.css';

function Layout({ isDark, toggleTheme }) {
  return (
    <div className={styles.layout}>
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <div className={styles.container}>
        <Sidebar />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

export default Layout;
