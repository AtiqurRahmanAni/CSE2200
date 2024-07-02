import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./pages/ProductDetails";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
});

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <QueryClientProvider client={queryClient}>
        <main className="container">
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/products" replace={true} />}
            ></Route>
            <Route element={<Products />} path="/products" />
            <Route element={<ProductDetails />} path="/products/:productId" />
            <Route element={<AddProduct />} path="/add-product" />
          </Routes>
        </main>
      </QueryClientProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
    </BrowserRouter>
  );
};

export default App;
