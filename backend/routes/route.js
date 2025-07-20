import express from "express";
import { getUser, updateassistant } from "../controllers/userController.js";
import isauth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/current", isauth, getUser);
userRouter.post(
  "/updateassistant",
  isauth,
  upload.single("assistantImg"),
  updateassistant
);
export default userRouter;
