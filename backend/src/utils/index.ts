import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HttpStatusCode } from "axios";

const validateData = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  else res.status(HttpStatusCode.BadRequest).send(errors);
};

export default {
  validateData,
};
