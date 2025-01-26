"use server";
import { axiosInstance } from "@/lib/axios-instance";
import { TBlogSchema } from "@/schemas/blog.schema";

export const getBlogs = async () => {
  try {
    const response = await axiosInstance.get(`/blogs`);
    return {
      status: response?.status,
      data: response?.data,
    };
  } catch (error) {
    return { status: 500, message: (error as Error)?.message };
  }
};

export const createBlog = async ({ data }: { data: TBlogSchema }) => {
  try {
    const response = await axiosInstance.post(`/blogs`, {
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
