import mongoose, { Schema } from "mongoose";
import { Quote } from "../interfaces/quotes";

const QuotesSchema = new Schema<Quote>(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "quotes",
  }
);

const QuotesModel = mongoose.model("Quotes", QuotesSchema);
export default QuotesModel;