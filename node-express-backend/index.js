import express from "express";
import userRouter from "./routes/userRoutes.js";
import { log } from "./middlewares/logger.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`Error connecting database ${err}`));

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(log);

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running" });
});

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
