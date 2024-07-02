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
  productCardImage: Yup.mixed()
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
  productImages: Yup.array()
    .min(2, "At least two files are required")
    .max(4, "Maximum 4 files are allowed")
    .of(
      Yup.mixed()
        .required("A file is required")
        .test(
          "fileSize",
          "File too large",
          (value) => value && value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          "Unsupported Format",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        )
    ),
});
