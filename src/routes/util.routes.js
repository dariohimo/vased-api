import { Router } from "express";
import { createDniType, createRole } from "../controllers/util.controller.js";
import { authAdmin } from "../middlewares/authAdmin.js";


const router = Router();

// create a dniType
router.post("/create-dnitype", authAdmin, createDniType);

// create a role
router.post("/create-role", authAdmin, createRole);


export default router;