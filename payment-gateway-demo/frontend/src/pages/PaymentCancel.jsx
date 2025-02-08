import { Button, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentCancel = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Stack spacing={2}>
        <h1 className="text-5xl text-yellow-400 font-bold">Payment Cancel</h1>
        <Button variant="contained" onClick={() => navigate("/")}>
          Go to home
        </Button>
      </Stack>
    </div>
  );
};

export default PaymentCancel;
