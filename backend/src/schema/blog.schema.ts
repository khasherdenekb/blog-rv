import * as z from "zod";

export const BlogSchema = z.object({
  title: z.string().nonempty(),
  content: z.string().nonempty(),
  coverImage: z.string().url(),
  authorId: z.string().nonempty(),
  category: z.string().nonempty(),
});
