import express from "express";
import {
  createUser,
  deleteUserByEmail,
  getAllUsers,
  updateUserByEmail,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);

router.route("/:email").put(updateUserByEmail).delete(deleteUserByEmail);

export default router;
