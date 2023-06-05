import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import HttpException from "@/utils/exceptions/http.exception";

const validateBody = async (
  req: Request,
  res: Response,
  next: NextFunction,
  schema: ObjectSchema
) => {
  try {
    const validation = await schema.validateAsync(req.body);

    if (validation.error) {
      next(new HttpException(400, "invalid request body"));
    }
  } catch (err) {
    console.error("Error:", err);
    next(new HttpException(500, "failed validating body"));
  }
};

export default validateBody;
