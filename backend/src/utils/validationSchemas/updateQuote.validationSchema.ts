import { body } from "express-validator";

export const updateQuoteValidationSchema = [
  body("quoteId").notEmpty().withMessage("Quote id is required").isMongoId().withMessage('Quote Id must be a mongodb id'),
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
];
