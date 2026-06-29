import styles from './ProgressBar.module.css';

function ProgressBar({ completed, total }) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className={styles.progressContainer}>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <p className={styles.progressText}>
        {completed} of {total} tasks completed
      </p>
    </div>
  );
}

export default ProgressBar;
