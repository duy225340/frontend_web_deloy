import axios from 'axios';
import { store } from '@/redux/store';
import { logout } from '@/redux/features/auth-slice';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle auth errors (redirect to login if needed)
    if (error.response && error.response.status === 401) {
      // Token hết hạn hoặc server restart (session invalid) -> Force logout
      store.dispatch(logout());
      
      // Nếu không ở trang login thì redirect về
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/signin')) {
         window.location.href = '/signin?session_expired=true';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
