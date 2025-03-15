import express from "express";
import { loginUser, registerUser, adminLogin, forgotPasswordUser, resetPasswordUser } from "../controllers/userControllers.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);
userRouter.post('/forgot-password', forgotPasswordUser)
userRouter.post('/reset-password/:token', resetPasswordUser)

export default userRouter;


