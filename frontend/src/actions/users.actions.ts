"use server";
import { axiosInstance } from "@/lib/axios-instance";
import { TUsersSchema } from "@/schemas/users.schema";

export const updateUserProfile = async ({ data }: { data: TUsersSchema }) => {
  try {
    const response = await axiosInstance.put(`/users/me`, {
      ...data,
    });
    return {
      status: response?.status,
      data: response?.data,
    };
  } catch (error) {
    console.error((error as Error)?.message);
  }
};
