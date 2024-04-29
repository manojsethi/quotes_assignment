import { Router } from "express";
import quotesController from "../controllers/quotes/quotes.controller";
import utils from "../utils";
import { fetchQuotesValidationSchema } from "../utils/validationSchemas/fetchQuotes.validationSchema";
import {
  createQuoteValidationSchema,
  deleteQuoteValidationSchema,
  updateQuoteValidationSchema,
} from "../utils/validationSchemas";

const quotesRoutes = Router();

quotesRoutes.post(
  "",
  createQuoteValidationSchema,
  utils.validateData,
  quotesController.createQuote
);
quotesRoutes.put(
  "",
  updateQuoteValidationSchema,
  utils.validateData,
  quotesController.updateQuote
);
quotesRoutes.delete(
  "",
  deleteQuoteValidationSchema,
  utils.validateData,
  quotesController.deleteQuote
);

quotesRoutes.get(
  "/list",
  fetchQuotesValidationSchema,
  utils.validateData,
  quotesController.fetchAllQuotes
);

export default quotesRoutes;
