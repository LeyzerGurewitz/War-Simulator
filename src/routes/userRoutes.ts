import express, {Router} from 'express';
import {registerUser, loginUser, getUserByToken } from '../controllers/userController'
import {verifyTokenForDefense} from '../middleware/IDFMiddleware'
import {verifyTokenAttack} from '../middleware/terroristsMiddleware'
const router:Router = express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)

router.get('/auth/user/attack', verifyTokenAttack, getUserByToken);
router.get('/auth/user/defense', verifyTokenForDefense, getUserByToken);
export default router; 