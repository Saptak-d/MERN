import { Router } from "express";
import { createTodo , getTodos , updateTodo ,deleteTodo } from "../controller/todos.controller.js";

import {auth} from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/').post(auth,createTodo).get(auth,getTodos)
router.route('/:id').put(auth , updateTodo).delete(auth,deleteTodo)

export default router