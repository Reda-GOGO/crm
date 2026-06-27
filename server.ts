import express from "express";
import cors from "cors";


const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 1337;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
