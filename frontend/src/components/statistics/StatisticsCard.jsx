import styles from './StatisticsCard.module.css';

function StatisticsCard({ title, value, subtitle, icon, variant = 'default', trend = null }) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      <div className={styles.header}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
      </div>
      <div className={styles.value}>
        {value}
        {trend && <span className={`${styles.trend} ${styles[trend.direction]}`}>{trend.text}</span>}
      </div>
    </div>
  );
}

export default StatisticsCard;
