import React from "react";
import styles from "./ProductCoverPhotoSelection.module.css";
import { IoMdCloseCircleOutline } from "react-icons/io";
import ImageUploadButton from "../ImageUploadButton/ImageUploadButton";

const ProductCoverPhotoSelection = ({ image, setImage, error = null }) => {
  return (
    <div>
      <div className={styles.product_cover_photo_selection_wrapper}>
        <span>Choose Product Cover Photo</span>
        {image ? (
          <div className={styles.product_cover_photo_preview}>
            <img src={URL.createObjectURL(image)} alt="Cover Photo" />
            <div
              className={styles.close_icon_wrapper}
              onClick={() => setImage(null)}
            >
              <IoMdCloseCircleOutline className={styles.close_icon} />
            </div>
          </div>
        ) : (
          <ImageUploadButton setFiles={setImage} />
        )}
      </div>
      <div className={styles.error_wrapper}>
        <span>{error}</span>
      </div>
    </div>
  );
};

export default ProductCoverPhotoSelection;
