import * as Yup from "yup";

export const productCreateSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name Too Short!")
    .max(30, "Name Too Long!")
    .required("Required"),
  price: Yup.number().positive().integer().required("Required"),
  description: Yup.string()
    .min(10, "Description Too Short!")
    .required("Required"),
});
