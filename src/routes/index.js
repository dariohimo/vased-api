import {Router} from 'express'
import { login, register } from '../controllers/userController.js'


export const userRouter = Router()


userRouter.get("/login", login);
userRouter.get("/register", register);
