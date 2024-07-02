import React from "react";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ProductCard = ({ id, productName, price, imageUrl, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div style={{ position: "relative" }}>
      <div
        className={styles.card_wrapper}
        onClick={() => navigate(`/products/${id}`)}
      >
        <div className={styles.product_card_image_wrapper}>
          <img className={styles.card_image} src={imageUrl} alt="Cover image" />
        </div>
        <div className={styles.product_card_information_container}>
          <p className={styles.product_name}>{productName}</p>
          <p className={styles.product_price}>{price + "Tk"}</p>
        </div>
      </div>
      <div className="close_icon_wrapper" onClick={onDelete}>
        <IoMdCloseCircleOutline className="close_icon" />
      </div>
    </div>
  );
};

export default ProductCard;
