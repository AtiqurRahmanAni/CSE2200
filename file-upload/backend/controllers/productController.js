import { v2 as cloudinary } from "cloudinary";
import { deleteFiles } from "../utils/index.js";
import pLimit from "p-limit";

const limit = pLimit(10);

export const createProduct = async (req, res) => {
  const { productCardImage, productImages } = req.files;
  try {
    if (!req.files || !productImages || !productCardImage) {
      return res.status(400).json({
        error: "Both productImages and productCardImage are required.",
      });
    }

    const productCardImageResult = await cloudinary.uploader.upload(
      productCardImage[0].path,
      { folder: "product_card_images" }
    );

    const imagesToUpload = productImages.map((image) => {
      return limit(
        async () =>
          await cloudinary.uploader.upload(image.path, { folder: "product_images" })
      );
    });

    const productImagesResult = await Promise.all(imagesToUpload);

    console.log(productCardImageResult);
    console.log(productImagesResult);

    return res.json({ message: "File uploaded" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  } finally {
    deleteFiles(productImages.map((item) => item.path));
    deleteFiles(productCardImage.map((item) => item.path));
  }
};
