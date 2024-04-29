export interface PaginateList {
  perPage: number;
  pageNo: number;
}

export interface BaseResponse {
  data: {
    [key: string]: any;
  };
  status: number;
  message?: string;
}

export interface BasePaginatedResponse {
  data: {
    records: {
      [key: string]: any;
    }[];
    totalRecords: number;
    perPage: number;
    pageNo: number;
    totalPages: number;
  };
  status: number;
}
