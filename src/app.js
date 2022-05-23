import express from "express";
import {
    userRouter
} from "./routes/index.js";
import classroomRouter from "./routes/classroom.routes.js";

const app = express();
app.use(express.json());
app.use("/auth", userRouter);
app.use("/classrooms", classroomRouter);

export default app;