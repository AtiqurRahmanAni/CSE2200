import express from "express";
import "dotenv/config";
import { log } from "./middleware/logger.middleware.js";
import productRouter from "./routes/productRoute.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(log);
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.ALLOWED_ORIGIN,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Connected to database"))
  .catch((err) => {
    console.log(`Error connecting to database ${err}`);
    process.exit(1);
  });

const PORT = process.env.PORT || 4000;

app.get("/api/test", (req, res) => {
  return res.json({ message: "Api is working" });
});

app.use("/api/products", productRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
