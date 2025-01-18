"use server";
import { cookies } from "next/headers";
import { TUserFullInfo } from "./use-user";
import { jwtDecode } from "jwt-decode";

export const useUserServerSide = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (token?.value) {
    const userInfo: TUserFullInfo = jwtDecode(token?.value);
    return {
      user: userInfo?.user,
      userId: userInfo?.userId,
      token,
      isAuthenticated: true,
    };
  } else {
    return { isAuthenticated: false };
  }
};
