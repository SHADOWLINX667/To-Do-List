import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import styles from './NotFound.module.css';

function NotFound() {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary">Go Back Home</Button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
