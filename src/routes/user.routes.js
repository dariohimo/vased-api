import { Router } from 'express';
import { createUser, updateUser, deleteUser, getUser, getUsers } from '../controllers/user.controller.js';


const router = Router()

router.get('/:id', getUser)
router.get('/', getUsers)
router.post('/create-user', createUser);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

export default router;