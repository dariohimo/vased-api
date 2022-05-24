import { Router } from "express";
import {
    createClassroom,
    updateClassroom,
    deleteClassroom
} from "../controllers/classroom.controller.js";

const router = Router()



// nombredelenrutador.metodo('/nombre-de-la-ruta')
router.post('/create-classroom', createClassroom)
router.put('/update-classroom/:id', updateClassroom)
router.delete('/delete-classroom/:id', deleteClassroom)



export default router   