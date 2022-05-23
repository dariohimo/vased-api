import { Router } from "express";
import { createClassroom } from "../controllers/classroom.controller.js";

const router = Router()



// nombredelenrutador.metodo('/nombre-de-la-ruta')
router.post('/create-classroom', createClassroom)



export default router   