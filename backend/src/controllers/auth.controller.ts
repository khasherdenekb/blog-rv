import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import { PrismaClient } from "@prisma/client";
import { LoginSchema, SignupSchema } from "@schema/auth.schema";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const signUp: RequestHandler = async (req, res) => {
  try {
    const parsedData = SignupSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(parsedData.password, 10);

    const user = await prisma.user.create({
      data: {
        username: parsedData.username,
        email: parsedData.email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET!, {
      expiresIn: "14d",
    });

    res.status(201).json({ message: "User successfully registered", token });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const parsedData = LoginSchema.parse(req.body);

    const user = await prisma.user.findUnique({
      where: { email: parsedData.email },
    });

    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      parsedData.password,
      user.password
    );

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET!, {
      expiresIn: "14d",
    });

    const { password, id, ...newUser } = user;
    res.status(200).json({
      message: "Login successfully",
      token,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  }
};

export const isValidToken: RequestHandler = (req, res) => {
  const { token } = req.body;

  if (!token) {
    res.status(400).json({ message: "Token is missing" });
    return;
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET!);

    if (!decodedToken) {
      res.status(401).json({ message: "Invalid or expired token" });
      return;
    }

    res.status(200).json({ message: "Token is valid" });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
