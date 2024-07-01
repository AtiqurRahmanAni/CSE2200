import ProductCard from "../components/ProductCard/ProductCard";
import { axiosInstance } from "../utils/axiosInstance";
import { useQuery } from "react-query";

const Products = () => {
  const {
    isLoading,
    error,
    data: allProducts,
  } = useQuery("getProducts", () => axiosInstance.get("/api/products"));

  return (
    <div>
      <div className="product_container">
        {allProducts?.data?.map((item, index) => (
          <ProductCard
            key={item._id}
            id={item._id}
            productName={item.name}
            price={item.price}
            imageUrl={item.productCardImage.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
