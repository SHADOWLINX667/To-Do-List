import Button from './Button';
import styles from './EmptyState.module.css';

function EmptyState({ title, description, actionLabel, onAction }) {
  return (
    <div className={styles.emptyState}>
      <div className={styles.icon}>📝</div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
