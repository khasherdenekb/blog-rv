import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CategorySchema } from "@schema/category.schema";
import { ZodError } from "zod";
import { TUser } from "type/user";

const prisma = new PrismaClient();

export const addCategory = async (
  req: Request & { user: TUser },
  res: Response
): Promise<void> => {
  try {
    const parsedData = CategorySchema.parse(req.body);

    const isUnique = await prisma.category.findUnique({
      where: {
        name: parsedData.name,
      },
    });

    if (isUnique) {
      res.status(400).json({ message: "Category already exists" });
    } else {
      await prisma.category.create({
        data: {
          name: parsedData.name,
          userId: req.user.userId,
        },
      });

      res.status(201).json({ message: "Category successfully created" });
    }
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.errors });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};

export const getCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
