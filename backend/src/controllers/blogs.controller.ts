import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { BlogSchema } from "@schema/blog.schema";
import { TUser } from "@type/user";

const prisma = new PrismaClient();

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await prisma.blogs.findMany();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createBlog = async (
  req: Request & { user: TUser },
  res: Response
): Promise<void> => {
  try {
    const parsedData = BlogSchema.parse(req.body);
    await prisma.blogs.create({
      data: {
        title: parsedData.title,
        content: parsedData.content,
        coverImage: parsedData.coverImage,
        authorId: req.user.userId,
        categoryId: parsedData.category,
      },
    });
    res.status(201).json({ message: "Blog successfully created" });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.errors });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
