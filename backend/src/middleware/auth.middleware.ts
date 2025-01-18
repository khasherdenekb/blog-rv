import jwt from "jsonwebtoken";
import { Response, NextFunction, Request } from "express";
import { TUser } from "type/user";

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  let token = null;

  if (authHeader) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        res.status(403).json({ message: "Invalid or expired token" });
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

export const checkAdmin = (
  req: Request & { user: TUser },
  res: Response,
  next: NextFunction
) => {
  if (req.user?.user?.role !== "admin") {
    res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};
