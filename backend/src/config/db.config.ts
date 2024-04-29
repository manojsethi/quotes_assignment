import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const dbUrl = process.env.QUOTES_BACKEND_MONGODB_URL || "";

export const connectDB = async () => {
  try {
    await mongoose
      .connect(dbUrl)
      .then((res) => console.log("Connected with DB"))
      .catch((err) => console.log(err, "DB Connection Error"));
  } catch (error:any) {
    console.log(error, "DB Connection Error");
  }
};
