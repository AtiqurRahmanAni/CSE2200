import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { axiosInstance } from "../utils/axiosInstance";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductDetails = () => {
  const param = useParams();
  const { productId } = param;

  const {
    isLoading,
    error,
    data: productDetails,
  } = useQuery(productId, () => axiosInstance.get(`api/products/${productId}`));

  return (
    <div className="product_details_wrapper">
      {productDetails && (
        <div className="product_details_container">
          <Carousel showArrows={false}>
            {productDetails.data.productImages.map((image) => (
              <img
                key={image.publicId}
                className="product_details_display_image"
                src={image.url}
                alt="Product image"
              />
            ))}
          </Carousel>
          <div className="product_details_information">
            <h1>{`Product Name: ${productDetails.data.name}`}</h1>
            <h2>{`Price: ${productDetails.data.price}`}</h2>
            <div>
              <h2>Description</h2>
              <p className="product_description">
                {productDetails.data.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
