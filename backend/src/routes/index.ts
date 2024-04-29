import { Router } from "express";
import quotes from "./quotes.routes";

const routes = Router();

routes.use("/quotes", quotes);


export default routes;
