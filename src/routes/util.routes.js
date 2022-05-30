import { Router } from "express";
import { createDniType, createRole } from "../controllers/util.controller.js";
import { authAdmin } from "../middlewares/authAdmin.js";


const router = Router();

// create a dniType
router.post("/create-dnitype", createDniType);

// create a role
router.post("/create-role", createRole);


export default router;