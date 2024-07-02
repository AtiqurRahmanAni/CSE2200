import React from "react";
import styles from "./ProductImagesSelection.module.css";
import ImageUploadButton from "../ImageUploadButton/ImageUploadButton";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ProductImagesSelection = ({ images, setImages, error }) => {
  const deleteImage = (imageIdx) => {
    setImages(images.filter((_, idx) => idx !== imageIdx));
  };
  return (
    <div className={styles.product_photos_selection_wrapper}>
      <p>Select Product Images (Max 4 images)</p>
      <div className={styles.container}>
        {images.length > 0 && (
          <div className={styles.product_images_container}>
            {images.map((image, idx) => (
              <div key={idx} className={styles.product_image_wrapper}>
                <img src={URL.createObjectURL(image)} alt="Product photos" />
                <div
                  className="close_icon_wrapper"
                  onClick={() => deleteImage(idx)}
                >
                  <IoMdCloseCircleOutline className="close_icon" />
                </div>
              </div>
            ))}
          </div>
        )}
        {images.length < 4 && (
          <ImageUploadButton multiple={true} setFiles={setImages} />
        )}
      </div>
      <div className={styles.error_wrapper}>
        <span>{error}</span>
      </div>
    </div>
  );
};

export default ProductImagesSelection;
