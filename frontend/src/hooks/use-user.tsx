"use client";

import { useEffect, useState } from "react";

export type TUser = {
  avatarUrl?: string;
  email: string;
  role: "contributor" | "admin" | "editor" | "author";
  username: string;
};

export const UseUser = () => {
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser) as TUser);
      }
    }
  }, []);

  const updateUser = (user: TUser) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
  };

  return { user, updateUser };
};
