import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://libary-management-system-server.vercel.app",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
