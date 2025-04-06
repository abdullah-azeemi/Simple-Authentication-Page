import axios from 'axios';

const API = axios.create({
  baseURL: 'api'
});

// Add a request interceptor to add the auth token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add a response interceptor to handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const loginUser = (email: string, password: string) => 
  API.post('/users/login', { email, password });

export const signupUser = (email: string, password: string) => 
  API.post('/users/signup', { email, password });

export default API;
