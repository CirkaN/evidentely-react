import axios from 'axios';

const token = localStorage.getItem('auth_token');

const axios_instance = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`
  },
  baseURL: import.meta.env.VITE_API_URL,
});


export default axios_instance;