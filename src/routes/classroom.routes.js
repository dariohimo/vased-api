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

const router = Router();

// nombredelenrutador.metodo('/nombre-de-la-ruta')

router.get("/", auth, getClassrooms);

// create a classroom
/**
 * @swagger
 * /classrooms:
 * post:
 * summary: Crea una nueva clase
 * description: Crea una nueva clase
 * tags:
 * - Classrooms
 * parameters:
 * - in: body
 *  name: body
 * description: body
 * required: true
 * schema:
 * type: object
 * properties:
 * capacity:
 * type: integer
 * name:
 * type: string
 * adminDescription:
 * type: string
 * description:
 * required: true
 * endsAt:
 * type: date
 * required: true
 * responses:
 * '200':
 * description: Success
 * '400':
 * description: Bad Request
 * '401':
 * description: Unauthorized
 * '500':
 * description: Internal Server Error
 * '404':
 * description: Not Found
 * '409':
 * description: Conflict
 * '422':
 * description: Unprocessable Entity
 * '403':
 * description: Forbidden
 * '401':
 * description: Unauthorized
 * '405':
 * description: Method Not Allowed
 * '408':
 * description: Request Timeout
 * 
 */
router.post("/create-classroom", authAdmin, createClassroom);

router.put("/update-classroom/:id", updateClassroom);

router.delete("/delete-classroom/:id", deleteClassroom);

router.post("/add-user", addUserToClassroom);

router.post("/add-task", addTaskToClassroom);

router.delete("/delete-user", deleteUserFromClassroom);

router.delete("/delete-task", deleteTaskFromClassroom);

export default router;
