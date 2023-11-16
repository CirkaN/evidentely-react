import axios from 'axios';


function axios_instance() {
  const token = localStorage.getItem('auth_token');

  return axios.create({
    headers: {
      'Authorization': `Bearer ${token}`
    },
    baseURL: import.meta.env.VITE_API_URL,
  });
}


export default axios_instance;