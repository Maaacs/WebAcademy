import { Router } from 'express';
import authController from './auth.controller';
import isAuth from '../../middlewares/isAuth';

const router = Router();

router.post('/signup', authController.signup);
router.put('/login', authController.login);
router.delete('/logout', isAuth, authController.logout);

export default router;