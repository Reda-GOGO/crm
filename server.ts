import express from "express";
import cors from "cors";
import database from "./services/database";
import { Request, Response } from "express";
import morgan from "morgan";

import { fileURLToPath } from "url";
import path from "path";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = "0.0.0.0";

const app = express();

app.set("query parser", "extended");
app.set("json spaces", 2);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("common"));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "http://localhost:5544",
  ]
}));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", async (req: Request, res: Response) => {
  const users = await database.user.findMany();
  res.json({ message: "Hello World!" });
});

const port = 1337;
app.listen(port, HOST, () => {
  console.log(`Server is running on port ${port}`);
});


