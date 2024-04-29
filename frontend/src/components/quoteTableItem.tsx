import React, { useState } from "react";
import { Quote } from "../interfaces/quote.interface";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";

type QuoteTableItemProps = {
  data: Quote;
  onSelectRecord: (quote: Quote | undefined) => void;
  setIsEditClicked: () => void;
  setIsDeleteClicked:()=> void;
};

function QuoteTableItem(props: QuoteTableItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="p-2 border rounded-lg mx-2 min-h-24 flex flex-row hover:shadow-lg justify-between items-center"
      key={props.data._id}
      onMouseEnter={() => {
        setIsHovered(true);
        props.onSelectRecord(props.data);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div key="data" className="w-[70%]">
        <span className="italic">{props.data.title}</span>
        <span className="font-semibold"> - {props.data.author}</span>
      </div>
      {isHovered && (
        <div
          key="action"
          className={`w-[20%] rounded-lg items-center justify-center flex`}
        >
          <button className="p-2 border hover:shadow-xl m-2 rounded-lg  text-white items-end">
            <PencilSquareIcon
              className="h-6 w-6 text-gray-500"
              onClick={() => {
                props.setIsEditClicked();
              }}
            />
          </button>
          <button className="p-2 border hover:shadow-xl m-2 rounded-lg  text-white items-end">
            <TrashIcon className="h-6 w-6 text-red-500" onClick={() => {
                props.setIsDeleteClicked();
              }} />
          </button>
        </div>
      )}
    </div>
  );
}

export default QuoteTableItem;
