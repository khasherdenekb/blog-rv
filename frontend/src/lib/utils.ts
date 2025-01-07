import axios from "axios";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";
import { BACKEND_URL } from "@/config/constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  validateStatus: (status) => status >= 200 && status < 500, // Handle status codes < 500 in `try` block
  timeout: 30000, // Optional: Set a timeout for requests (in milliseconds)
});
