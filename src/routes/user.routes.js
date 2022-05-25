import { Router } from 'express';
import { createUser, updateUser, deleteUser, getUser, getUsers } from '../controllers/user.controller.js';
import { auth } from '../middlewares/auth.js';
import { authAdmin } from '../middlewares/authAdmin.js';


const router = Router()

// get a user by id
router.get('/:id', auth, getUser)

// get all users
router.get('/', auth, getUsers)

// create a user
router.post('/create-user', authAdmin, createUser);

// update a user
router.put('/update-user/:id', authAdmin, updateUser);

// delete a user
router.delete('/delete-user/:id', authAdmin, deleteUser);

export default router;