import { jwtDecode } from "jwt-decode";

export type TUser = {
  avatarUrl?: string;
  email: string;
  role: "contributor" | "admin" | "editor" | "author";
  username: string;
  blogs?: [];
};

export type TUserFullInfo = {
  userId: string;
  user: {
    avatarUrl?: string;
    email: string;
    role: "contributor" | "admin" | "editor" | "author";
    username: string;
    blogs?: [];
  };
  isAuthenticated?: boolean;
};

export const useUser = () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (token) {
    const userInfo: TUserFullInfo = jwtDecode(token);
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
