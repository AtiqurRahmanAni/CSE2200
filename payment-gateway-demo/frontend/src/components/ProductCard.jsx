import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import testImg from "../assets/test.png";
import { useMutation } from "@tanstack/react-query";
import axios from "../api/axios";

const ProductCard = ({ data }) => {
  const { _id } = data;
  const initPurchaseMutation = useMutation({
    mutationFn: (values) => axios.post(`/products/${_id}/purchase`, {}),
    onSuccess: (response) => {
      console.log(response);
      const paymentUrl = response.data.paymentUrl;
      window.location.replace(paymentUrl);
    },
    onError: (error) => {
      if (error?.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    },
  });

  return (
    <Card sx={{ minWidth: 250 }}>
      <CardMedia sx={{ height: 140 }} image={testImg} title="product image" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.productName}
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          {`Price: $${data.price}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="medium"
          variant="outlined"
          onClick={initPurchaseMutation.mutate}
        >
          Buy Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
