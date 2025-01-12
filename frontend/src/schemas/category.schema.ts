import * as z from "zod";

export const categorySchema = z.object({
  name: z.string().nonempty(),
});

export type TCategorySchema = z.infer<typeof categorySchema>;
