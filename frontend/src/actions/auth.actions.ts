"use server";
import { axiosInstance } from "@/lib/axios-instance";
import { TAuthSchema } from "@/schemas/auth.schema";
import { cookies } from "next/headers";

export const login = async ({ data }: { data: TAuthSchema }) => {
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
