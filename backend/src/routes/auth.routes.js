import { Router } from "express";
import { register } from "../controller/auth.controller.js";
import { LoginUser } from '../controller/auth.controller.js';

const router  = Router();

router.route('/register').post(register);
router.route('/login').post(LoginUser);



export default router ;