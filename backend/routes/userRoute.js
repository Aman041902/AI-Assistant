import express from "express";
import { login, logout, signup } from "../controllers/auth.js";

const authRouter = express.Router();

authRouter.post("/register", signup);
authRouter.post("/login", login);
authRouter.get("/logout", logout);

export default authRouter;
