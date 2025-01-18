"use server";
import { cookies } from "next/headers";
import { axiosInstance } from "./axios-instance";

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};

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
