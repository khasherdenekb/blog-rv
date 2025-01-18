"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { BACKEND_URL } from "@/config/constant";

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  validateStatus: (status) => status >= 200 && status < 500,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token?.value}`;
    }
    return config;
  },
  (error) => Promise.reject(error instanceof Error ? error : new Error(error))
);

export { axiosInstance };
