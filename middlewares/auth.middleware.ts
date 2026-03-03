import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
dotenv.config();

export const authMiddleware = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ error: { code: "UNAUTHORIZED", message: "No token provided" } });

  const token = authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ error: { code: "UNAUTHORIZED", message: "No token provided" } });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: { code: "UNAUTHORIZED", message: "Invalid token" } });
  }
};
