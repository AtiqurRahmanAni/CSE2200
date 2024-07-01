import React from "react";
import styles from "./ProductCard.module.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, productName, price, imageUrl }) => {
  const navigate = useNavigate();

  return (
    <div
      className={styles.card_wrapper}
      onClick={() => navigate("/add-product")}
    >
      <div className={styles.product_card_image_wrapper}>
        <img className={styles.card_image} src={imageUrl} alt="Cover image" />
      </div>
      <div className={styles.product_card_information_container}>
        <p className={styles.product_name}>{productName}</p>
        <p className={styles.product_price}>{price + "Tk"}</p>
      </div>
    </div>
  );
};

export default ProductCard;
