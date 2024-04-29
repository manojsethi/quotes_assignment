import React, { useState } from "react";
import apiServices from "../apiServices";
import { HttpStatusCode } from "axios";
import { Quote } from "../interfaces/quote.interface";

type QuoteFormModalProps = {
  setIsOpenForm: (value:boolean)=> void;
  isOpenForm: boolean;
  reloadQuotes: () => void;
  initialValues?: Quote;
};
function QuoteFormModal(props: QuoteFormModalProps) {
  const { setIsOpenForm, reloadQuotes } = props;
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setIsSaving(true);
    const title = event.currentTarget.elements?.title?.value;
    const author = event.currentTarget.elements?.author?.value;

    if (!props?.initialValues) {
      const response = await apiServices.createQuoteService({
        title,
        author,
      });
      if (response.status === HttpStatusCode.Ok) {
        reloadQuotes();
      }
    } else {
      const response = await apiServices.updateQuoteService({
        title,
        quoteId: props.initialValues._id,
        author,
      });
      if (response.status === HttpStatusCode.Ok) {
        reloadQuotes();
      }
    }
    setIsSaving(false);
  };
  return (
    <div
      className="h-full w-full z-50 border m-2 rounded-lg"
      onClick={() => {}}
    >
      <div className="p-4 md:p-5">
        <div className="text-3xl font-semibold mb-4">
          {props.initialValues ? "Update quote" : "Add new quote"}
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-medium text-gray-900 ">
              Quote
            </label>
            <input
              type="text"
              name="title"
              defaultValue={props.initialValues?.title}
              id="title"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="my thoughts"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Author
            </label>
            <input
              type="text"
              name="author"
              defaultValue={props.initialValues?.author}
              id="author"
              placeholder="myself"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>

          <div className="w-full">
            <button
              type="submit"
              disabled={isSaving}
              className=" text-white bg-blue-700 mt-5 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:shadow-xl"
            >
              Save
            </button>

            <button
              type="reset"
              disabled={isSaving}
              className="bg-red-500 p-2 hover:shadow-xl m-2 rounded-lg text-white items-end"
              onClick={() => {
                setIsOpenForm(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuoteFormModal;
