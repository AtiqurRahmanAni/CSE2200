import { Container } from "@mui/material";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFail from "./pages/PaymentFail";
import PaymentCancel from "./pages/PaymentCancel";

function App() {
  return (
    <Container maxWidth="xl">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-fail" element={<PaymentFail />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </Container>
  );
}

export default App;
