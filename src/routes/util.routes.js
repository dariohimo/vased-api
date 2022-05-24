import { Router } from "express";
import { createDniType, createRole } from "../controllers/util.controller.js";


const router = Router();


router.post("/create-dnitype", createDniType);
router.post("/create-role", createRole);


export default router;