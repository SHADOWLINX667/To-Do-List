import { getCategoryColor } from '../../utils/categoryUtils';
import styles from './CategoryBadge.module.css';

function CategoryBadge({ category }) {
  const color = getCategoryColor(category);

  return (
    <span
      className={styles.badge}
      style={{
        backgroundColor: `${color}20`,
        color: color,
        borderColor: color,
      }}
    >
      {category}
    </span>
  );
}

export default CategoryBadge;
