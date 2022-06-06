import { Router } from "express";
import {
    createAnswer,
    addFeedback,
    getAnswersByUser,
    getAnswersByUserAndClassroom,
} from "../controllers/answer.controller.js";

import { auth } from "../middlewares/auth.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { authTeacher } from "../middlewares/authTeacher.js";

const router = Router();

//get all answers by user
router.get("/:userId", auth, getAnswersByUser);

//get all answers by User and classrooms
router.get("/answers-by-user-classroom/:userId/:classroomId", auth, getAnswersByUserAndClassroom);

//create a new answer
router.post("/create-answer", auth, createAnswer);

//add feedback to an answer
router.post("/add-feedback", authTeacher, addFeedback);

export default router;