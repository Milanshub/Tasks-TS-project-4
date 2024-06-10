// router allows to handle routes 
import {Router} from "express"; 
import * as taskController from "../controllers/taskController"; 
import { authMiddleware } from "../middlewares/authMiddleware";

//a router file is used to define and manage different routes (endpoints) that your application can respond to.
const router: Router = Router(); 

//defines POST route at tasks, then goes through middleware and lastly makes a call creatTask()
router.post('/tasks', authMiddleware, taskController.createTask); 

//defines GET route at tasks, then goes through middleware and lastly makes a call getTask()
router.get('/tasks', authMiddleware, taskController.getTask); 

//defines GET route at tasks, then goes through middleware and lastly makes a call getTaskById()
router.get('/tasks/:id', authMiddleware, taskController.getTaskById); 

//defines PUT route at tasks, then goes through middleware and lastly makes a call updateTask()
router.put('/tasks/:id', authMiddleware, taskController.updateTask); 

//defines DELETE route at tasks, then goes through middleware and lastly makes a call deleteTask()
router.delete('/tasks/:id', authMiddleware, taskController.deleteTask); 

export default router; 