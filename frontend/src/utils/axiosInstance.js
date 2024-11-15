import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      // Handle unauthorized, potentially logout the user
    }
    return Promise.reject(error);
  }
);

export default instance;