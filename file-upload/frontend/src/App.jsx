import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import { QueryClient, QueryClientProvider } from "react-query";

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
            <Route element={<Products />} path="/" />
            <Route element={<AddProduct />} path="/add-product" />
          </Routes>
        </main>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
