import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Stack spacing={2}>
        <h1 className="text-5xl text-green-500 font-bold">Payment Success</h1>
        <Button variant="contained" onClick={() => navigate("/")}>
          Go to home
        </Button>
      </Stack>
    </div>
  );
};

export default PaymentSuccess;
