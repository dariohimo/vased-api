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
import { authAdmin } from "../middlewares/authAdmin.js";
import { authTeacher } from "../middlewares/authTeacher.js";

const router = Router();

// nombredelenrutador.metodo('/nombre-de-la-ruta')

// get all classrooms
router.get("/", auth, getClassrooms);

// create a classroom
router.post("/create-classroom", authAdmin, createClassroom);

// update a classroom
router.put("/update-classroom/:id", authAdmin, updateClassroom);

// delete a classroom
router.delete("/delete-classroom/:id", authAdmin, deleteClassroom);

// add a user to a classroom
router.post("/add-user", authAdmin, addUserToClassroom);

// add a task to a classroom
router.post("/add-task", authTeacher, addTaskToClassroom);

// delete a user from a classroom
router.delete("/delete-user", authAdmin, deleteUserFromClassroom);

// delete a task from a classroom
router.delete("/delete-task", authTeacher, deleteTaskFromClassroom);

export default router;
