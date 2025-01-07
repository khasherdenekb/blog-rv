"use server";
import { axiosInstance } from "@/lib/utils";
import { cookies } from "next/headers";

type loginProps = {
  data: {
    email: string;
    password: string;
  };
};

export const login = async ({ data }: loginProps) => {
  try {
    const cookieStore = await cookies();
    const response = await axiosInstance.post(`/auth/login`, {
      ...data,
    });
    if (response?.status === 200) {
      cookieStore.set("token", response?.data?.token);
    }
    return {
      status: response?.status,
      data: response?.data,
    };
  } catch (error) {
    return { status: 500, message: (error as Error)?.message };
  }
};
