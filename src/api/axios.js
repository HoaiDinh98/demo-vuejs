import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://localhost:44313/api/SinhVienManagement/",
  headers: {
    // "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosInstance;
