import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { CategorySchema } from "@schema/category.schema";

const prisma = new PrismaClient();

export const addCategory: RequestHandler = async (req, res) => {
  try {
    console.log(req.user);
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    // const parsedData = CategorySchema.parse(req.body);

    // const newCategory = await prisma.category.create({
    //   data: {
    //     name: parsedData.name,
    //   },
    // });
    res.status(201).json({ message: "Category successfully created" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCategory: RequestHandler = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
