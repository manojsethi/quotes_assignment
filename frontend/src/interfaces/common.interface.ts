export interface BaseResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface BasePaginatedResponse<T> {
  data: {
    records: T[];
    totalRecords: number;
    perPage: number;
    pageNo: number;
    totalPages: number;
  };
  status: number;
}
