import styles from './Checkbox.module.css';

function Checkbox({ checked, onChange, label, ...props }) {
  return (
    <label className={styles.checkboxLabel}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={styles.checkbox}
        {...props}
      />
      <div className={styles.checkboxCustom}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  );
}

export default Checkbox;
