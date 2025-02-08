import express from "express";
import {
  cancelPayment,
  createProduct,
  failPayment,
  getOrders,
  getProducts,
  purchaseProduct,
  successPayment,
} from "../controllers/productController.js";
import { productCreateValidator } from "../utils/validators.js";
import validateRequest from "../middlewares/validateRequest.middleware.js";

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(productCreateValidator, validateRequest, createProduct);
router.post("/:productId/purchase", purchaseProduct);
router.post("/payment-success/:tranId", successPayment);
router.post("/payment-fail/:tranId", failPayment);
router.post("/payment-cancel/:tranId", cancelPayment);
router.get("/orders", getOrders);

export default router;
