import express from "express";
import {
  getOtherUsers,
  loginController,
  logoutController,
  registerController,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.middleware.js";

const router = express.Router();

router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").get(logoutController);
router.route("/").get(isAuthenticated, getOtherUsers);

export default router;
