import * as z from "zod";

export const blogSchema = z.object({
  content: z.string().nonempty(),
  title: z.string().nonempty(),
  categoryId: z.string().nonempty(),
});

export type TBlogSchema = z.infer<typeof blogSchema>;
