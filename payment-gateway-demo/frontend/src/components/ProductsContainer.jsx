import { CircularProgress, Grid2 } from "@mui/material";
import React from "react";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import axios from "../api/axios";

const ProductsContainer = () => {
  const {
    isLoading,
    isError,
    data: response,
  } = useQuery({
    queryKey: ["getProducts"],
    queryFn: () => axios.get("/products"),
  });

  const products = response?.data;

  return isLoading ? (
    <CircularProgress />
  ) : (
    !isError && (
      <Grid2
        container
        spacing={2}
        sx={{ justifyContent: "center", alignItems: "center", py: 2 }}
      >
        {products.map((product) => (
          <ProductCard key={product._id} data={product} />
        ))}
      </Grid2>
    )
  );
};

export default ProductsContainer;
