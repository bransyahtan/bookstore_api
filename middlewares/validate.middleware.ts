import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const validate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({
        error: {
          code: "VALIDATION_ERROR",
          message: error.details.map((detail) => detail.message).join(", "),
        },
      });
    }
    next();
  };
};
