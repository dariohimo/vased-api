import { Router } from "express";
import { createTask, updateTask, deleteTask } from "../controllers/task.controller.js";

const router = Router()



// nombredelenrutador.metodo('/nombre-de-la-ruta')
router.post('/create-task', createTask)     //created item
router.put('/update-task/:id', updateTask)  //update item
router.delete('/delete-task/:id', deleteTask) //delete item


export default router   