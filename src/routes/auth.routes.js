import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const router = Router();


// login user
router.post("/login", login);

// register user
router.post("/register", register);

export default router;