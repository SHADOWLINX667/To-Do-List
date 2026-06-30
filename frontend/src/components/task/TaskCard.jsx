import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import Checkbox from '../common/Checkbox';
import CategoryBadge from '../common/CategoryBadge';
import { formatDate, isToday, getDueText, isOverdue } from '../../utils/dateUtils';
import styles from './TaskCard.module.css';

function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  const isDueToday = isToday(task.dueDate);
  const isOverdueTask = isOverdue(task.dueDate, task.completed);

  return (
    <div className={`${styles.card} ${task.completed ? styles.completed : ''}`}>
      <div className={styles.left}>
        <Checkbox
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          aria-label="Toggle task completion"
        />
        <div className={styles.content}>
          <h3 className={styles.title}>{task.title}</h3>
          {task.description && <p className={styles.description}>{task.description}</p>}
          <div className={styles.meta}>
            <CategoryBadge category={task.category} />
            {task.priority === 'high' && (
              <span className={styles.priorityBadge} title="High Priority">
                !
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.right}>
        {task.dueDate && (
          <span
            className={`${styles.dueDate} ${isDueToday ? styles.today : ''} ${
              isOverdueTask ? styles.overdue : ''
            }`}
          >
            {getDueText(task.dueDate)}
          </span>
        )}
        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            onClick={() => onEdit(task)}
            aria-label="Edit task"
            title="Edit"
          >
            <FiEdit2 size={18} />
          </button>
          <button
  className={`${styles.actionButton} ${styles.delete}`}
  onClick={() => onDelete(task)}  // ✅ CORRECT - pass full task object
  aria-label="Delete task"
>
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
