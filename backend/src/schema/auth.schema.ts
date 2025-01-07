import * as z from "zod";

export const SignupSchema = z
  .object({
    username: z.string().nonempty(),
    email: z.string().email(),
    password: z.string().min(8).max(30),
    confirmPassword: z.string().min(8).max(30),
    avatarUrl: z.string().url().optional(),
    blogs: z
      .array(
        z.object({
          title: z.string().nonempty(),
          content: z.string().nonempty(),
          authorId: z.string().nonempty(),
          id: z.string().nonempty(),
          createdAt: z.string().datetime(),
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
