import * as z from "zod";

export const SignupSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password confirmation must be at least 8 characters long"),
    avatarUrl: z.string().url("Invalid URL").optional(),
    blogs: z
      .array(
        z.object({
          title: z.string().min(1, "Title is required"),
          content: z.string().min(1, "Content is required"),
          authorId: z.string().min(1, "Author ID is required"),
          id: z.string().min(1, "Blog ID is required"),
          createdAt: z.string().datetime("Invalid date format"),
        })
      )
      .optional()
      .default([]),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "Passwords must match",
      });
    }
  });

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});
