import * as z from "zod";

export const authSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().min(8).max(30),
});

export type TAuthSchema = z.infer<typeof authSchema>;
