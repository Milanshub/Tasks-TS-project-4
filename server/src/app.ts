import express from 'express'; 
import TaskRoutes from "./routes/tasks"

const app = express(); 

app.use(express.json()); 

app.use('/api/tasks', TaskRoutes)

app.listen(5000, () => {
    console.log("server running on port 5000!");
}); 

export default app; 