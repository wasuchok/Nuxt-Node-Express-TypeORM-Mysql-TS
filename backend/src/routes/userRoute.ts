import express, { Request, Response } from 'express';

const router = express.Router();

import { 
getAllUsers,
getSingleUser,
createUser,
changePassword,
deleteUser,
updateUser
} from '../controller/userController'

router.get('/', getAllUsers);

router.get('/:id', getSingleUser);

router.post('/', createUser);

router.put('/changePassword/:id', changePassword)

router.put('/:id', updateUser);

router.delete('/:id', deleteUser)

export default router;