import { Router } from "express";
import { login, register, forgotPassword, resetPassword, activateAccount } from "../controllers/auth.controller.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const router = Router();


// login user
router.post("/login", login);

// register user
router.post("/register", register);

// forgot password
router.post("/forgot-password", forgotPassword);

// reset password
router.post("/reset-password/:id/:token", resetPassword);

// activate account
router.post("/activate-account/:id/:token", activateAccount)

export default router;