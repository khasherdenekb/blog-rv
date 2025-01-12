"use server";

import { axiosInstance } from "@/lib/auth-util";

type loginProps = {
  data: {
    name: string;
  };
};

export const getCategory = async () => {
  try {
    const response = await axiosInstance.get(`/category`);
    return {
      status: response?.status,
      data: response?.data,
    };
  } catch (error) {
    return { status: 500, message: (error as Error)?.message };
  }
};

export const addCategory = async ({ data }: loginProps) => {
  try {
    const response = await axiosInstance.post(`/category`, {
      ...data,
    });
    return {
      status: response?.status,
      data: response?.data,
    };
  } catch (error) {
    return { status: 500, message: (error as Error)?.message };
  }
};
