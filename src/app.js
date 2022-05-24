import express from "express";
import classroomRouter from "./routes/classroom.routes.js";
import userRouter from './routes/user.routes.js';
import taskRouter from "./routes/task.routes.js"
import authRouter from "./routes/auth.routes.js";
import utilRouter from "./routes/util.routes.js";



const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/classrooms", classroomRouter);
app.use("/users", userRouter);
app.use("/tasks", taskRouter);
app.use("/utils", utilRouter);

export default app;