import toast from "react-hot-toast";
import ProductCard from "../components/ProductCard/ProductCard";
import { axiosInstance } from "../utils/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Products = () => {
  const queryClient = useQueryClient();
  const {
    isLoading,
    error,
    data: allProducts,
  } = useQuery("getProducts", () => axiosInstance.get("/api/products"));

  const mutation = useMutation({
    mutationFn: (productId) =>
      axiosInstance.delete(`/api/products/${productId}`),
    onError: (error) => {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    },
    onSuccess: (data) => {
      toast.success(data.data.message);
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
    },
  });

  return (
    <div style={{ paddingTop: "15px", paddingBottom: "15px" }}>
      <div className="product_container">
        {allProducts?.data?.map((item) => (
          <ProductCard
            key={item._id}
            id={item._id}
            productName={item.name}
            price={item.price}
            imageUrl={item.productCardImage.url}
            onDelete={() => {
              if (!mutation.isLoading) {
                mutation.mutate(item._id);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
