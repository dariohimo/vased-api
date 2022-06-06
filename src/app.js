import express from "express";
import classroomRouter from "./routes/classroom.routes.js";
import userRouter from "./routes/user.routes.js";
import taskRouter from "./routes/task.routes.js";
import authRouter from "./routes/auth.routes.js";
import utilRouter from "./routes/util.routes.js";
import answerRouter from "./routes/answer.routes.js";
import cors from "cors";
import { Router } from "express";


const router = Router();

const app = express();

app.use(cors());
app.use(express.json());


router.use("/auth", authRouter);
router.use("/classrooms", classroomRouter);
router.use("/users", userRouter);
router.use("/tasks", taskRouter);
router.use("/utils", utilRouter);
router.use("/answers", answerRouter);

app.use("/api/v1", router);
export default app;
