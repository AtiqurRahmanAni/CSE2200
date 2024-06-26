import { v2 as cloudinary } from "cloudinary";
import { deleteFiles } from "../utils/index.js";
import pLimit from "p-limit";
import Product from "../models/product.js";

const limit = pLimit(10);

export const getProducts = async (req, res) => {
  const products = await Product.find()
    .sort({ createdAt: -1 })
    .select({
      productCardImage: { url: true },
      name: true,
      price: true,
    });
  return res.status(200).send(products);
};

export const createProduct = async (req, res) => {
  const { productCardImage, productImages } = req.files;
  const { name, price, description } = req.body;
  try {
    if (!req.files || !productImages || !productCardImage) {
      return res.status(400).json({
        error: "Both productImages and productCardImage are required.",
      });
    }

    const anotherProduct = await Product.findOne({
      name: { $regex: new RegExp(`^${name}$`, "i") }, // case insensitive regex match
    }).select({
      name: true,
    });

    if (anotherProduct) {
      return res
        .status(200)
        .json({ message: "Product already exists with this name" });
    }

    const productCardImageResult = await cloudinary.uploader.upload(
      productCardImage[0].path,
      { folder: "product_card_images" } // cloudinary folder where the images are stored
    );

    const imagesToUpload = productImages.map((image) => {
      return limit(
        async () =>
          await cloudinary.uploader.upload(image.path, {
            folder: "product_images",
          }) // cloudinary folder where the images are stored
      );
    });

    const productImagesResult = await Promise.all(imagesToUpload);

    const newProduct = await Product.create({
      name: name,
      price: price,
      description: description,
      productCardImage: {
        url: productCardImageResult.secure_url,
        publicId: productCardImageResult.public_id,
      },
      productImages: productImagesResult.map((item) => ({
        url: item.secure_url,
        publicId: item.public_id,
      })),
    });

    return res.json({ message: "New product created" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    if (productImages) deleteFiles(productImages.map((item) => item.path));
    if (productCardImage)
      deleteFiles(productCardImage.map((item) => item.path));
  }
};
