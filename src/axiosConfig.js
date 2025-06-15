import axios from "axios";

const axiosInstance = axios.create({
   // "http://localhost:8080",
  baseURL: "https://tcatelieback-eub2epddgsdfamd3.canadacentral-01.azurewebsites.net/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
