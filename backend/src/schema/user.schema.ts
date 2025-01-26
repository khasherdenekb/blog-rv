import * as z from "zod";

export const UserSchema = z.object({
  username: z.string().nonempty(),
  avatarUrl: z.string().url().optional(),
});
