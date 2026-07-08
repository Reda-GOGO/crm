import express from "express";
import cors from "cors";
import morgan from "morgan";

import { fileURLToPath } from "url";
import path from "path";
import cookieParser from "cookie-parser";

import product from "./routers/products";
import collection from "./routers/collections";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = "0.0.0.0";

const app = express();

app.set("query parser", "extended");
app.set("json spaces", 2);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "http://localhost:5544",
  ]
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/products", product);
app.use("/collections", collection);


const port = 1337;
app.listen(port, HOST, () => {
  console.log(`Server is running on port ${port}`);
});
