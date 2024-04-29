import { query } from "express-validator";

export const fetchQuotesValidationSchema = [
  query("pageNo").notEmpty().withMessage("Page number is required").toInt(),
  query("perPage").notEmpty().withMessage("Per page is required").toInt().isInt({ min: 1, max: 150 }).withMessage("Per page must be between 1 and 150"),
];
