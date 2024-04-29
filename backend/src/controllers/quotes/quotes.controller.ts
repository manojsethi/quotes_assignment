import { NextFunction, Request, Response } from "express";
import quotesService from "./quotes.service";
import {
  CreateQuotePayload,
  DeleteQuoteInterface,
  UpdateQuotePayload,
  FetchQuotesPayload
} from "../../interfaces/quotes";

const fetchAllQuotes = async (
  _req: Request,
  _res: Response,
  _nextFunction: NextFunction
) => {
  const body = _req.query as any as FetchQuotesPayload;
  let response = await quotesService.fetchAllQuotesService(body);
  _res.json(response);
};

const createQuote = async (
  _req: Request,
  _res: Response,
  _nextFunction: NextFunction
) => {
  const payload = _req.body as CreateQuotePayload;

  let response = await quotesService.createQuoteService(payload);
  _res.json(response);
};

const updateQuote = async (
  _req: Request,
  _res: Response,
  _nextFunction: NextFunction
) => {
  const payload = _req.body as UpdateQuotePayload;

  let response = await quotesService.updateQuoteService(payload);
  _res.json(response);
};

const deleteQuote = async (
  _req: Request,
  _res: Response,
  _nextFunction: NextFunction
) => {
  const payload = _req.body as DeleteQuoteInterface;

  let response = await quotesService.deleteQuoteService(payload);
  _res.json(response);
};

export default {
  fetchAllQuotes,
  createQuote,
  updateQuote,
  deleteQuote,
};
