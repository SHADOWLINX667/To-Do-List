import Modal from '../common/Modal';
import Button from '../common/Button';
import styles from './DeleteConfirmModal.module.css';

function DeleteConfirmModal({ isOpen, onClose, onConfirm, taskTitle }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Task" size="sm">
      <div className={styles.content}>
        <p className={styles.message}>
          Are you sure you want to delete <strong>{taskTitle}</strong>? This action cannot be undone.
        </p>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteConfirmModal;
