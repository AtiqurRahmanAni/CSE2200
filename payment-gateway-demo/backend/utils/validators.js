import { check } from "express-validator";

export const productCreateValidator = [
  check("name")
    .isString()
    .withMessage("Product name must be a string")
    .notEmpty()
    .withMessage("Product name is required"),
  check("price")
    .isInt({ min: 0 })
    .withMessage("Price must be a non-negative number")
    .notEmpty()
    .withMessage("Price is required"),
];
