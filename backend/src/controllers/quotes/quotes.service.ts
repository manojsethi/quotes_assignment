import { HttpStatusCode } from "axios";
import {
  BasePaginatedResponse,
  BaseResponse,
} from "../../interfaces/common.interface";
import QuotesModel from "../../dbModels/quotes";
import {
  CreateQuotePayload,
  DeleteQuoteInterface,
  FetchQuotesPayload,
  UpdateQuotePayload,
} from "../../interfaces/quotes";

const fetchAllQuotesService = async (
  payload: FetchQuotesPayload
): Promise<BasePaginatedResponse> => {
  try {
    let result = await QuotesModel.aggregate([
      {
        $facet: {
          totalCount: [
            {
              $count: "total",
            },
          ],
          records: [
            {
              $match: {},
            },
            {
              $skip: (payload.pageNo - 1) * payload.perPage,
            },
            {
              $limit: payload.perPage,
            },
          ],
        },
      },
    ]);

    let totalRecords = result?.[0]?.totalCount?.[0]?.total;
    let records = result?.[0]?.records;

    return {
      data: {
        pageNo: payload.pageNo,
        perPage: payload.perPage,
        records: records,
        totalPages: Math.ceil(totalRecords / payload.perPage),
        totalRecords: totalRecords,
      },
      status: HttpStatusCode.Ok,
    };
  } catch (error) {
    return {
      data: {
        pageNo: payload.pageNo,
        perPage: payload.perPage,
        records: [],
        totalPages: 0,
        totalRecords: 0,
      },
      status: HttpStatusCode.Ok,
    };
  }
};

const createQuoteService = async (
  payload: CreateQuotePayload
): Promise<BaseResponse> => {
  try {
    const createdDoc = await QuotesModel.create(payload);

    return {
      data: createdDoc,
      status: HttpStatusCode.Ok,
    };
  } catch (error: any) {
    return {
      data: {},
      status: HttpStatusCode.BadRequest,
      message: error?.message,
    };
  }
};

const updateQuoteService = async (
  payload: UpdateQuotePayload
): Promise<BaseResponse> => {
  try {
    const updatedDoc = await QuotesModel.findByIdAndUpdate(
      payload.quoteId,
      {
        $set: {
          ...payload,
        },
      },
      {
        new: true,
      }
    );

    if (!updatedDoc) throw new Error("Quote not found!");

    return {
      data: updatedDoc,
      status: HttpStatusCode.Ok,
    };
  } catch (error: any) {
    return {
      data: {},
      status: HttpStatusCode.BadRequest,
      message: error?.message,
    };
  }
};

const deleteQuoteService = async (
  payload: DeleteQuoteInterface
): Promise<BaseResponse> => {
  try {
    const deletedDoc = await QuotesModel.findByIdAndDelete(payload.quoteId);
    if (!deletedDoc) throw new Error("Quote not found!");

    return {
      data: deletedDoc,
      status: HttpStatusCode.Ok,
    };
  } catch (error: any) {
    return {
      data: {},
      status: HttpStatusCode.BadRequest,
      message: error?.message,
    };
  }
};

export default {
  fetchAllQuotesService,
  createQuoteService,
  updateQuoteService,
  deleteQuoteService,
};
