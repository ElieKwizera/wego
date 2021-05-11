import express from 'express';

import {register, login, googleLogin,getMe, updateUser, getUsers} from '../controllers/auth.js'

const router = express.Router();

router.post('/login', login);
router.post('/register',register);
router.post('/google', googleLogin);
router.get('/',getMe);
router.post('/updateuser', updateUser);
router.get('/getusers', getUsers);



export default router;