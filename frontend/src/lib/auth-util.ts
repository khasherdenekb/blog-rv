"use server";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const logout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("token");
};

type TRole = { user: { role: string } };

export const checkAdmin = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (token?.value) {
    const userInfo: TRole = jwtDecode(token?.value);
    return userInfo?.user?.role === "admin";
  } else {
    return false;
  }
};
