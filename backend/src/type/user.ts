export type TUser = {
  userId: string;
  user: {
    username: string;
    email: string;
    role: "contributor" | "admin" | "editor" | "author";
    avatarUrl?: string;
  };
};
