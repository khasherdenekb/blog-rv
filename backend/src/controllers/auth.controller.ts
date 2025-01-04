import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { LoginSchema, SignupSchema } from "@schema/auth.schema";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const signUp = async (req: Request, res: Response) => {
  try {
    const parsedData = SignupSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    const user = await prisma.user.create({
      data: {
        name: parsedData.name,
        email: parsedData.email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "14d",
    });

    return res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const parsedData = LoginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(
      parsedData.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "14d",
    });

    return res.status(200).json({ message: "Login successfully", token });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
