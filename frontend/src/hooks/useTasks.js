import { useState, useEffect, useCallback } from 'react';
import { tasksAPI } from '../services/api';

export const useTasks = (filters = {}, page = 1) => {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await tasksAPI.getAll({ ...filters, page });
      setTasks(response.data.tasks);
      setPagination(response.data.pagination);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(async (data) => {
    try {
      const response = await tasksAPI.create(data);
      setTasks((prev) => [response.data, ...prev]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const updateTask = useCallback(async (id, data) => {
    try {
      const response = await tasksAPI.update(id, data);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data : task))
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await tasksAPI.delete(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  const toggleComplete = useCallback(async (id) => {
    try {
      const response = await tasksAPI.toggleComplete(id);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data : task))
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, []);

  return {
    tasks,
    pagination,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleComplete,
  };
};
