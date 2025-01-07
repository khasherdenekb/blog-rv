import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload; // You can adjust the type according to your JWT payload
    }
  }
}
