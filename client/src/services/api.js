import axios from 'axios';

// Create an axios instance with the backend's base URL.
// This means we don't have to type 'http://localhost:5000/api' for every request.
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

/**
 * This is an interceptor. It's a powerful feature from axios.
 * It acts like a gatekeeper for every request that goes out from the frontend.
 * Before any request is sent, it checks if a 'token' exists in localStorage.
 * If it does, it automatically adds the 'Authorization: Bearer <token>' header.
 * This is how we authenticate users for protected routes like getting a profile.
 */
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;