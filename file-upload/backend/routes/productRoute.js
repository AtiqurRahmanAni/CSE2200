import express from "express";
import {
  getProducts,
  createProduct,
} from "../controllers/productController.js";
import { upload } from "../middleware/multer.middleware.js";
import { multerErrorHandling } from "../middleware/multerError.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(
    upload.fields([
      { name: "productCardImage", maxCount: 1 },
      { name: "productImages", maxCount: 4 },
    ]),
    multerErrorHandling,
    createProduct
  );

export default router;
