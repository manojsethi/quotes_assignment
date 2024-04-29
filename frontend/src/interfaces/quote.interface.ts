export interface Quote {
  _id: string;
  title: string;
  author: string;
}

export interface CreateQuotePayload {
  title: string;
  author: string;
}

export interface UpdateQuotePayload {
  quoteId: string;
  title: string;
  author: string;
}

export interface DeleteQuotePayload {
  quoteId: string;
}

export interface FetchQuotesPayload {
  pageNo: number;
  perPage: number;
}
