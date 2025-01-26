import * as z from "zod";

export const usersSchema = z.object({
  username: z.string().nonempty(),
  avatarUrl: z.optional(z.any()).refine((file) => file !== undefined, {
    message: "Please select a avatar url.",
  }),
});

export type TUsersSchema = z.infer<typeof usersSchema>;
