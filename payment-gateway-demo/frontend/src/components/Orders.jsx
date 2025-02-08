import {
  Box,
  Button,
  Modal,
  Paper,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import styled from "styled-components";
import axios from "../api/axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1565C0",
    color: "#ffffff",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F5F5F5",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Orders = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    isLoading,
    isError,
    data: response,
  } = useQuery({
    queryKey: ["getOrders"],
    queryFn: () => axios.get("/products/orders"),
  });

  const orders = response?.data;

  return (
    <div className="fixed top-2 right-2">
      <div>
        <Button
          variant="contained"
          sx={{ maxWidth: "80px", borderRadius: "15px" }}
          onClick={handleOpen}
        >
          See Orders
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ textAlign: "center" }}
          >
            Orders
          </Typography>
          <TableContainer component={Paper} sx={{ maxHeight: "80vh" }}>
            <TableBody
              sx={{ minWidth: "400px", overflowY: "scroll" }}
              aria-label="customized table"
            >
              <TableHead>
                <TableRow>
                  <StyledTableCell>Transaction ID</StyledTableCell>
                  <StyledTableCell align="right">Order Status</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isLoading &&
                  !isError &&
                  orders.map((order) => (
                    <StyledTableRow key={order._id}>
                      <StyledTableCell component="th" scope="row">
                        {order.transactionId}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {order.status}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </TableBody>
          </TableContainer>
        </Box>
      </Modal>
    </div>
  );
};

export default Orders;
