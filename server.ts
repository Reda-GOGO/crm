import express from "express";
import cors from "cors";
import morgan from "morgan";

import path from "path";
import cookieParser from "cookie-parser";

import product from "./routers/products";
import collection from "./routers/collections";



const HOST = "0.0.0.0";

const app = express();

app.set("query parser", "extended");
app.set("json spaces", 2);
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "http://localhost:5544",
  ],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));


app.use("/uploads", express.static(path.resolve(process.cwd(), "uploads")));

app.use("/products", product);
app.use("/collections", collection);


const port = 1337;
app.listen(port, HOST, () => {
  console.log(`Server is running on port ${port}`);
});
