// router allows to handle routes 
import {Router} from "express"; 
import * as taskController from "../controllers/taskController"; 

//a router file is used to define and manage different routes (endpoints) that your application can respond to.
const router: Router = Router(); 

//defines POST route at tasks, then goes through middleware and lastly makes a call creatTask()
router.post('/tasks', taskController.createTask); 

//defines GET route at tasks, then goes through middleware and lastly makes a call getTask()
router.get('/tasks', taskController.getTask); 

//defines GET route at tasks, then goes through middleware and lastly makes a call getTaskById()
router.get('/tasks/:id', taskController.getTaskById); 

//defines PUT route at tasks, then goes through middleware and lastly makes a call updateTask()
router.put('/tasks/:id', taskController.updateTask); 

//defines DELETE route at tasks, then goes through middleware and lastly makes a call deleteTask()
router.delete('/tasks/:id', taskController.deleteTask); 

export default router; 