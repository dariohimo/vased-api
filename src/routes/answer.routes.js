import { Router } from "express";
import {
    createAnswer,
    addFeedback,
    getAnswersByUser,
} from "../controllers/answer.controller.js";

import { auth } from "../middlewares/auth.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { authTeacher } from "../middlewares/authTeacher.js";

const router = Router();

router.get("/:userId", auth, getAnswersByUser);
router.post("/create-answer", auth, createAnswer);
router.post("/add-feedback", authTeacher, addFeedback);

export default router;