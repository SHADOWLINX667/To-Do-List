import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tasks API
export const tasksAPI = {
  getAll: (params) => axiosInstance.get('/tasks', { params }),
  getById: (id) => axiosInstance.get(`/tasks/${id}`),
  create: (data) => axiosInstance.post('/tasks', data),
  update: (id, data) => axiosInstance.put(`/tasks/${id}`, data),
  delete: (id) => axiosInstance.delete(`/tasks/${id}`),
  toggleComplete: (id) => axiosInstance.patch(`/tasks/${id}/complete`),
};

// Statistics API
export const statisticsAPI = {
  getStatistics: () => axiosInstance.get('/statistics'),
};

export default axiosInstance;
