import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { TUser } from "@type/user";
import { UserSchema } from "@schema/user.schema";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export const editUserProfile = async (
  req: Request & { user: TUser },
  res: Response
): Promise<void> => {
  try {
    const parsedData = UserSchema.parse(req.body);
    const user = await prisma.user.update({
      where: {
        id: req.user.userId,
      },
      data: {
        username: parsedData.username,
        avatarUrl: parsedData.avatarUrl,
      },
    });
    if (!user) {
      res.status(400).json({ message: "User not found" });
    } else {
      res.status(200).json({ message: "User successfully updated" });
    }
  } catch (error) {
    console.log((error as Error)?.message, "ALDAA BGAMU");
    if (error instanceof ZodError) {
      res.status(400).json({ message: error.errors });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
