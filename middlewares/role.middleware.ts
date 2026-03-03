import { NextFunction, Request, Response } from "express";

export const roleMiddleware = (role: "admin" | "customer") => {
  return (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    if (!req.user)
      return res.status(401).json({
        error: { code: "UNAUTHORIZED", message: "Not authenticated" },
      });
    if (req.user.role !== role)
      return res.status(403).json({
        error: { code: "FORBIDDEN", message: `${role} role required` },
      });
    next();
  };
};
