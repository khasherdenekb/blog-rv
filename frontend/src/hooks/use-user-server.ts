import { cookies } from "next/headers";
import { TUser } from "./use-user";
import { jwtDecode } from "jwt-decode";

export const useUserServerSide = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  if (token) {
    const userInfo: TUser = jwtDecode(token?.value);
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
