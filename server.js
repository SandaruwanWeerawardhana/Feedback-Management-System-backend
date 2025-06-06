import express from "express";
import cors from "cors";
import { dbInit } from "./src/config/db.js";
import feedbackRouter from "./src/routes/feedbackRoute.js";
import morgan from "morgan";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

await dbInit();

app.use("/api/feedback", feedbackRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
