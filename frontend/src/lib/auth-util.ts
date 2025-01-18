"use server";
import { TUserFullInfo } from "@/hooks/use-user";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};

export const checkAdmin = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (token?.value) {
    const userInfo: TUserFullInfo = jwtDecode(token?.value);
    return userInfo?.user?.role === "admin";
  } else {
    return false;
  }
};
