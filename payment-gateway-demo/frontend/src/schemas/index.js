import * as yup from "yup";

export const productCreateSchema = yup.object().shape({
  name: yup.string().required("Product name required"),
  price: yup
    .number()
    .positive("Price must be positive")
    .required("Price is required"),
});
