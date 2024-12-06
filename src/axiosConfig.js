import axios from "axios";

const axiosInstance = axios.create({
  // baseURL:
  //   "http://localhost:8080",
  baseURL: "https://e-buy-spring-web-app-czcqekaqhqdpbbfs.canadacentral-01.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
