import { body } from "express-validator";

export const createQuoteValidationSchema = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
];
