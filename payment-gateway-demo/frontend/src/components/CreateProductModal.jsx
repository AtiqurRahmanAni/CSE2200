import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { Formik, Form } from "formik";
import { productCreateSchema } from "../schemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../api/axios";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateProductModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const queryClient = useQueryClient();

  const productCreateMutation = useMutation({
    mutationFn: (values) => axios.post("/products", values),
    onSuccess: (response) => {
      const { message } = response.data;
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
    },
    onError: (error) => {
      if (error?.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    },
  });

  const handleClose = () => {
    if (!productCreateMutation.isPending) {
      setOpen(false);
    }
  };

  return (
    <div>
      <div className="fixed bottom-2 right-2">
        <IconButton color="primary" size="large" onClick={handleOpen}>
          <IoMdAdd />
        </IconButton>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a product
          </Typography>
          <Formik
            initialValues={{ name: "", price: 10 }}
            validationSchema={productCreateSchema}
            onSubmit={(values) => productCreateMutation.mutate(values)}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <Stack direction="column" spacing={2}>
                  <TextField
                    id="outlined-required"
                    label="Product Name"
                    value={values.name}
                    onChange={(e) => setFieldValue("name", e.target.value)}
                    error={errors.name && touched.name}
                    helperText={errors.name && touched.name && errors.name}
                  />
                  <TextField
                    id="outlined-number"
                    label="Price"
                    type="number"
                    value={values.price}
                    onChange={(e) => setFieldValue("price", e.target.value)}
                    error={errors.price && touched.price}
                    helperText={errors.price && touched.price && errors.price}
                  />
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                  <Button
                    variant="contained"
                    size="medium"
                    type="submit"
                    loadingPosition="start"
                    loading={productCreateMutation.isPending}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    size="medium"
                    type="button"
                    color="error"
                    onClick={handleClose}
                    disabled={productCreateMutation.isPending}
                  >
                    Cancel
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateProductModal;
