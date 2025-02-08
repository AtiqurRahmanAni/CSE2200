import { Schema, model } from "mongoose";
import { getDhakaTime } from "../utils/index.js";

const orderSchema = new Schema({
  transactionId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "success", "fail", "cancel"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: getDhakaTime(),
  },
});

const Order = model("Order", orderSchema);
export default Order;
