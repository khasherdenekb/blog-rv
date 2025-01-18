import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { LoginSchema, SignupSchema } from "@schema/auth.schema";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedData = SignupSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    const user = await prisma.user.create({
      data: {
        username: parsedData.username,
        email: parsedData.email,
        password: hashedPassword,
        role: parsedData?.role,
        avatarUrl: parsedData?.avatarUrl,
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: "14d",
    });

    res.status(201).json({ message: "User successfully registered", token });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsedData = LoginSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
    } else {
      const isPasswordValid = await bcrypt.compare(
        parsedData.password,
        user.password
      );

      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid email or password" });
      } else {
        const { password, id, ...newUser } = user;

        const token = jwt.sign({ userId: user.id, user: newUser }, JWT_SECRET, {
          expiresIn: "14d",
        });

        res.status(200).json({
          message: "Login successfully",
          token,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};
