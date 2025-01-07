import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - Token missing" });
  }

  if (!JWT_SECRET) {
    return res
      .status(500)
      .json({ message: "Server configuration error - Missing JWT_SECRET" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;

    req.user = decodedToken;

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid or expired token" });
  }
};
