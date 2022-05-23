import { Router } from "express";
import { createTask, updateTask } from "../controllers/task.controller.js";

const router = Router()



// nombredelenrutador.metodo('/nombre-de-la-ruta')
router.post('/create-task', createTask)
router.put('/update-task/:id', updateTask)



export default router   