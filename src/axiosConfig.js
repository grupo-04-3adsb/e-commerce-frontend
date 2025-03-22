import axios from "axios";

const axiosInstance = axios.create({
   // "http://localhost:8080",
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
