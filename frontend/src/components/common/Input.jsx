import styles from './Input.module.css';

function Input({
  label,
  error,
  size = 'md',
  className = '',
  ...props
}) {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={`${styles.input} ${styles[size]} ${error ? styles.error : ''} ${className}`}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

export default Input;
