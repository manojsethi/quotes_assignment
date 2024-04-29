import { body } from "express-validator";

export const deleteQuoteValidationSchema = [
  body("quoteId").notEmpty().withMessage("Quote id is required").isMongoId().withMessage('Quote Id must be a mongodb id'),
];
