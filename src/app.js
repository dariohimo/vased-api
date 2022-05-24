import express from "express";
import {
    userRouter
} from "./routes/index.js";
import classroomRouter from "./routes/classroom.routes.js";
import taskRouter from './routes/task.routes.js';


const app = express();
app.use(express.json());
app.use("/auth", userRouter);
app.use("/classrooms", classroomRouter);
app.use("/tasks", taskRouter);

export default app;