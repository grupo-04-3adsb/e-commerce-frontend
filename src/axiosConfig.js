import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
   // "http://localhost:8080",
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
