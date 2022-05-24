import { Router } from "express";
import { createTask, updateTask, deleteTask, getTasks, getTaskClassrooms, addTaskClassroomToUser } from "../controllers/task.controller.js";
import { auth } from "../middlewares/auth.js";

const router = Router()



// nombredelenrutador.metodo('/nombre-de-la-ruta')
router.get("/", auth, getTasks)
router.get("/tasks-classrooms", auth, getTaskClassrooms)
router.post('/create-task', createTask)     //created item
router.put('/update-task/:id', updateTask)  //update item
router.delete('/delete-task/:id', deleteTask) //delete item
router.post('/add-user-task-classroom', addTaskClassroomToUser) 

export default router