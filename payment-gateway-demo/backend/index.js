import express from "express";
import cors from "cors";
import "dotenv/config";
import log from "./middlewares/logger.middleware.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";
import mongoose from "mongoose";
import productRouter from "./routes/productRoutes.js";

const app = express();
const PORT = process.env.PORT || 8000;

const initDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected successfully");
  } catch (err) {
    console.error("Database connection failed", err);
    process.exit(1);
  }
};

initDatabase();

app.use(express.json());
app.use(log);
app.use(cors({ credentials: true, origin: process.env.ALLOWED_ORIGIN }));

app.get("/api/v1", (req, res) => {
  return res.status(200).json({ message: "Backend is working" });
});
app.use("/api/v1/products", productRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
