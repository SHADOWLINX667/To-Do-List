import styles from './Button.module.css';

function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  ...props
}) {
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`;

  return (
    <button className={buttonClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
}

export default Button;
