import express from "express";
import classroomRouter from "./routes/classroom.routes.js";
import userRouter from './routes/user.routes.js';



const app = express();
app.use(express.json());
app.use("/auth", userRouter);
app.use("/classrooms", classroomRouter);
app.use("/users", userRouter);

export default app;