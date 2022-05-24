import { Router } from "express";
import {
    createClassroom,
    updateClassroom,
    deleteClassroom,
    getClassrooms,
    addTeacherToClassroom
} from "../controllers/classroom.controller.js";

import { auth } from "../middlewares/auth.js";

const router = Router()



// nombredelenrutador.metodo('/nombre-de-la-ruta')
router.get("/", auth, getClassrooms)
router.post('/create-classroom', createClassroom)
router.put('/update-classroom/:id', updateClassroom)
router.delete('/delete-classroom/:id', deleteClassroom)
router.post('/add-teacher', addTeacherToClassroom)



export default router   