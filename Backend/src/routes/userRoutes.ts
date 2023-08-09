import { Router } from 'express';

import { Register, Login } from '../controllers/userController';

const router = Router();

router.post('/register', Register);
router.post('/login', Login);
// TODO: Add a route to get the logged in user's details

export const userRouter = router;
