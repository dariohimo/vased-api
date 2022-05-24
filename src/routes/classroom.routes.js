import { Router } from "express";
import {
    createClassroom,
    updateClassroom,
    deleteClassroom,
    getClassrooms,
    addUserToClassroom,
    addTaskToClassroom,
    deleteUserFromClassroom,
    deleteTaskFromClassroom,
} from "../controllers/classroom.controller.js";

import { auth } from "../middlewares/auth.js";

const router = Router()



// nombredelenrutador.metodo('/nombre-de-la-ruta')
router.get("/", auth, getClassrooms)
router.post('/create-classroom', createClassroom)
router.put('/update-classroom/:id', updateClassroom)
router.delete('/delete-classroom/:id', deleteClassroom)
router.post('/add-user', addUserToClassroom)
router.post('/add-task', addTaskToClassroom)
router.delete('/delete-user', deleteUserFromClassroom)
router.delete('/delete-task', deleteTaskFromClassroom)


export default router   