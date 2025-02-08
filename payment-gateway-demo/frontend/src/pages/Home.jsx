import React from "react";
import CreateProductModal from "../components/CreateProductModal";
import ProductsContainer from "../components/ProductsContainer";
import Orders from "../components/Orders";

const Home = () => {
  return (
    <div>
      <CreateProductModal />
      <ProductsContainer />
      <Orders />
    </div>
  );
};

export default Home;
