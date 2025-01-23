import * as z from "zod";

export const blogSchema = z.object({
  content: z.string().nonempty(),
  title: z.string().nonempty(),
  categoryId: z.string().nonempty(),
  coverImage: z.any().refine((file) => file !== undefined, {
    message: "Please select a cover image.",
  }),
});

export type TBlogSchema = z.infer<typeof blogSchema>;
