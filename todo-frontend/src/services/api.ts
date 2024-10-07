import axios from 'axios';

// Create an Axios instance with the backend base URL
const api = axios.create({
  baseURL: 'http://localhost:4000/api',
});

// Export API methods
export const getTasks = () => api.get('/tasks');
export const getTask = (id: string) => api.get(`/tasks/${id}`);
export const createTask = (task: any) => api.post('/tasks', task);
export const updateTask = (id: string, task: any) => api.put(`/tasks/${id}`, task);
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);

export default api;
