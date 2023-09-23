import axios from 'axios';


const axios_instance = axios.create({
  baseURL:import.meta.env.VITE_API_URL,
});


export default axios_instance;