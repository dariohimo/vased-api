import { Router } from "express";
import { createTask } from "../controllers/task.controller.js";

const router = Router()



// nombredelenrutador.metodo('/nombre-de-la-ruta')
router.post('/create-task', createTask)



export default router   