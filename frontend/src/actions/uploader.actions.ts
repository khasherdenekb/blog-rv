"use server";
import { axiosInstance } from "@/lib/axios-instance";

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response?.data;
  } catch (error) {
    console.error((error as Error)?.message);
  }
};
