import mongoose from "mongoose";
const { Schema } = mongoose;

const productImageSchema = new Schema(
  { url: String, publicId: String },
  { _id: false }
);

const productSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  productCardImage: productImageSchema,
  productImages: [productImageSchema],
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
