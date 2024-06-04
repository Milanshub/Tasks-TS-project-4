import {Router} from "express"; 
import { getTasks, createTasks, updateTasks, deleteTasks } from "../controllers/taskController";


const router = Router(); 

router.get('/', async (req, res) => {
    const tasks = await getTasks(); 
    res.json(tasks)
}); 

router.post('/', async (req, res) => {
    const tasks = await createTasks(req.body); 
    res.json(tasks)
}); 

router.put('/:id', async (req, res) => {
    const tasks = await updateTasks(parseInt(req.params.id, 10), req.body); 
    res.json(tasks); 
}); 


router.delete('/:id', async (req, res) => {
    const tasks = await deleteTasks(parseInt(req.params.id));
    res.json(tasks);
}); 

export default router; 