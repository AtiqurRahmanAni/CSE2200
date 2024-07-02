import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
const FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const productCreateSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name Too Short!")
    .max(30, "Name Too Long!")
    .required("Required"),
  price: Yup.number().positive().integer().required("Required"),
  description: Yup.string()
    .min(10, "Description Too Short!")
    .required("Required"),
  productCoverPhoto: Yup.mixed()
    .required("A cover image is required")
    .test(
      "fileSize",
      "Cover photo too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    ),
});
