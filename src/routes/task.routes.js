import { Router } from "express";
import { createTask, updateTask, deleteTask, getTasks, getTaskClassrooms, addTaskClassroomToUser, deleteUserTaskClassroom, getAnswer, getUserTaskClassrooms } from "../controllers/task.controller.js";
import { auth } from "../middlewares/auth.js";
import { authTeacher } from "../middlewares/authTeacher.js";

const router = Router()



// nombredelenrutador.metodo('/nombre-de-la-ruta')

// get all tasks
router.get("/", auth, getTasks)

// get all task classrooms
router.get("/tasks-classrooms", auth, getTaskClassrooms)

// create a task
router.post('/create-task', authTeacher, createTask)    

// update a task
router.put('/update-task/:id', authTeacher, updateTask) 

// delete a task
router.delete('/delete-task/:id', authTeacher, deleteTask) 

// add a task classroom to a user
router.post('/add-user-task-classroom', authTeacher, addTaskClassroomToUser) 

// delete a user task classroom
router.delete('/delete-user-task-classroom', authTeacher, deleteUserTaskClassroom)

// get answer
router.get('/answer/:userTaskClassroomId', auth, getAnswer)

// get userTaskClassrooms
router.get('/user-task-classrooms/:userId', auth, getUserTaskClassrooms)

export default router