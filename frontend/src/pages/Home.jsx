import { useState, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useTasks } from '../hooks/useTasks';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import EmptyState from '../components/common/EmptyState';
import TaskCard from '../components/task/TaskCard';
import TaskModal from '../components/task/TaskModal';
import DeleteConfirmModal from '../components/task/DeleteConfirmModal';
import FilterBar from '../components/task/FilterBar';
import ProgressBar from '../components/task/ProgressBar';
import styles from './Home.module.css';

function Home() {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeSort, setActiveSort] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const { tasks, pagination, loading, error, createTask, updateTask, deleteTask, toggleComplete } = useTasks(filters, page);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setPage(1);

    const newFilters = { ...filters };
    if (filter === 'all') {
      delete newFilters.completed;
    } else if (filter === 'active') {
      newFilters.completed = 'false';
    } else if (filter === 'completed') {
      newFilters.completed = 'true';
    }

    setFilters(newFilters);
  };

  const handleSortChange = (sort) => {
    setActiveSort(sort);
    setFilters((prev) => ({ ...prev, sort }));
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1);
    if (query.trim()) {
      setFilters((prev) => ({ ...prev, search: query }));
    } else {
      const newFilters = { ...filters };
      delete newFilters.search;
      setFilters(newFilters);
    }
  };

  const handleAddTask = async (formData) => {
    await createTask(formData);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = async (formData, taskId) => {
    await updateTask(taskId, formData);
  };

  const handleDeleteClick = (task) => {
    setSelectedTask(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedTask) {
      await deleteTask(selectedTask.id);
      setIsDeleteModalOpen(false);
      setSelectedTask(null);
    }
  };

  const handleToggleComplete = (taskId) => {
    toggleComplete(taskId);
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = pagination?.total || 0;

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.title}>Tasks</h1>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setIsAddModalOpen(true)}
            className={styles.addButton}
          >
            <FiPlus size={20} />
            <span className={styles.addButtonText}>Add Task</span>
          </Button>
        </div>
      </div>

      <div className={styles.container}>
        <FilterBar
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
        />

        {loading && <Loader />}

        {!loading && error && (
          <div className={styles.error}>
            <p>Error loading tasks: {error}</p>
          </div>
        )}

        {!loading && !error && tasks.length === 0 ? (
          <EmptyState
            title="No tasks yet"
            description={searchQuery ? 'No matching tasks found' : 'Create your first task to get started'}
            actionLabel={!searchQuery ? 'Create your first task' : undefined}
            onAction={() => setIsAddModalOpen(true)}
          />
        ) : (
          <>
            <div className={styles.tasksList}>
              {tasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onToggleComplete={handleToggleComplete}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>

            {pagination && pagination.pages > 1 && (
              <div className={styles.pagination}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className={styles.paginationButton}
                >
                  Previous
                </button>
                <span className={styles.paginationInfo}>
                  Page {page} of {pagination.pages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                  disabled={page === pagination.pages}
                  className={styles.paginationButton}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {!loading && !error && tasks.length > 0 && (
          <ProgressBar completed={completedCount} total={totalCount} />
        )}
      </div>

      <TaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddTask}
      />

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleUpdateTask}
        task={selectedTask}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedTask(null);
        }}
        onConfirm={handleConfirmDelete}
        taskTitle={selectedTask?.title || 'Task'}
      />
    </div>
  );
}

export default Home;
