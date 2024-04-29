import express from "express";
import dotenv from "dotenv";
import routes from "./src/routes";
import cors from 'cors'
import { connectDB } from "./src/config/db.config";
dotenv.config();

const PORT = process.env.QUOTES_BACKEND_PORT;

const app = express();

app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

connectDB();
app.use("/v1/api", routes);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT} `);
});
