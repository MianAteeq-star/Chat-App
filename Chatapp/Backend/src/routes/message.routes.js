import express from "express";
import {
  getMessages,
  sendMessages,
} from "../controllers/message.controller.js";
import { isAuthenticated } from "../middlewares/userAuth.middleware.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessages);
router.route("/:id").get(isAuthenticated, getMessages);

export default router;
