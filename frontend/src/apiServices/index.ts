import axios from "axios";
import {
  CreateQuotePayload,
  DeleteQuotePayload,
  FetchQuotesPayload,
  Quote,
  UpdateQuotePayload,
} from "../interfaces/quote.interface";
import { ApiEndpoints } from "../utils/apiEndpoints";
import {
  BasePaginatedResponse,
  BaseResponse,
} from "../interfaces/common.interface";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_QUOTES_BASE_URL,
});

const createQuoteService = async (
  payload: CreateQuotePayload
): Promise<BaseResponse<Quote>> => {
  return await axiosInstance
    .post(ApiEndpoints.Quotes.Common, payload)
    .then((res) => res.data)
    .catch((err) => err);
};

const updateQuoteService = async (
  payload: UpdateQuotePayload
): Promise<BaseResponse<Quote>> => {
  return await axiosInstance
    .put(ApiEndpoints.Quotes.Common, payload)
    .then((res) => res.data)
    .catch((err) => err);
};

const deleteQuoteService = async (
  payload: DeleteQuotePayload
): Promise<BaseResponse<Quote>> => {
  return await axiosInstance
    .delete(ApiEndpoints.Quotes.Common, { data: payload })
    .then((res) => res.data)
    .catch((err) => err);
};

const fetchQuotesService = async (
  payload: FetchQuotesPayload
): Promise<BasePaginatedResponse<Quote>> => {
  return await axiosInstance
    .get(ApiEndpoints.Quotes.Common + "/list", { params: payload })
    .then((res) => res.data)
    .catch((err) => err);
};
export default {
  createQuoteService,
  updateQuoteService,
  deleteQuoteService,
  fetchQuotesService,
};
