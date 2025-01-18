import axios from "axios";
import { BACKEND_URL } from "@/config/constant";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  validateStatus: (status) => status >= 200 && status < 500,
  timeout: 30000,
});

export { axiosInstance };
