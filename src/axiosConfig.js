import axios from "axios";

const axiosInstance = axios.create({
   // "http://localhost:8080",
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
