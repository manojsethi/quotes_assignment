import React, { useEffect, useState } from "react";
import QuoteTableItem from "./quoteTableItem";
import QuoteFormModal from "./quoteForm.modal";
import apiServices from "../apiServices";
import { Quote } from "../interfaces/quote.interface";
import { HttpStatusCode } from "axios";
import DeleteQuoteModal from "./deleteQuote.modal";

function QuotesTable() {
  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditClicked, setIsEditClicked] = useState<boolean>(false);
  const [isDeleteClicked, setIsDeleteClicked] = useState<boolean>(false);
  const [selectedRecord, setSelectedRecord] = useState<Quote>();

  const [pagination, setPagination] = useState<{
    perPage: number;
    pageNo: number;
  }>({
    pageNo: 1,
    perPage: 50,
  });
  const [records, setRecords] = useState<Quote[]>([]);

  const fetchQuotes = async () => {
    setIsLoading(true);
    const response = await apiServices.fetchQuotesService({
      pageNo: pagination.pageNo,
      perPage: pagination.perPage,
    });
    if (response.status === HttpStatusCode.Ok) {
      setRecords(response.data.records);
      setIsOpenForm(false);
      setSelectedRecord(undefined);
      setIsEditClicked(false);
      setIsDeleteClicked(false);
    }
    setIsLoading(false);
  };
  const handleDelete = async (id: string) => {
    const response = await apiServices.deleteQuoteService({
      quoteId: id,
    });
    if (response.status === HttpStatusCode.Ok) {
      setIsOpenForm(false);
      setSelectedRecord(undefined);
      setIsEditClicked(false);
      setIsDeleteClicked(false);
      fetchQuotes();
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);
  return (
    <div className="mt-5 w-full h-full min-h-[600px] rounded-lg flex flex-col space-y-3">
      {!isOpenForm && (
        <div className="w-full">
          <button
            className="bg-blue-500 p-2 hover:shadow-xl m-2 rounded-lg text-white items-end"
            onClick={() => {
              setIsOpenForm(true);
            }}
          >
            Create Quote
          </button>
        </div>
      )}

      {((isEditClicked && selectedRecord) || isOpenForm) && (
        <QuoteFormModal
          reloadQuotes={() => {
            fetchQuotes();
          }}
          setIsOpenForm={(value) => {
            setIsOpenForm(value);
            setSelectedRecord(undefined);
            setIsEditClicked(false);
          }}
          isOpenForm={isOpenForm}
          initialValues={
            isEditClicked && selectedRecord ? selectedRecord : undefined
          }
        />
      )}

      {records.map((quote) => {
        return (
          <QuoteTableItem
            key={quote._id}
            setIsEditClicked={() => {
              setIsEditClicked(true);
            }}
            setIsDeleteClicked={() => {
              setIsDeleteClicked(true);
            }}
            data={quote}
            onSelectRecord={(quote) => {
              if (!quote) {
                setIsOpenForm(false);
                setIsEditClicked(false);
              }
              setSelectedRecord(quote);
            }}
          />
        );
      })}

      {isDeleteClicked && selectedRecord && (
        <DeleteQuoteModal
          onDelete={async () => {
            await handleDelete(selectedRecord._id);
          }}
          isOpen={isDeleteClicked}
          onCancel={() => {
            setIsDeleteClicked(false);
          }}
        />
      )}
    </div>
  );
}

export default QuotesTable;
