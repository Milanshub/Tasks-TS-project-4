import React from "react";
import '../App.css'; 

interface Task {
    title: string; 
    description: string; 
    status: string; 
    dueDate: Date | undefined;
};

interface TaskItemProps{
    task: Task; 
}

const TaskItem: React.FC<TaskItemProps> = ({task}) =>{
    // Format the dueDate if it exists, otherwise show "No due date"
    const formattedDueDate = task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : 'No due date';


    return(
        <div className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Due Date: {formattedDueDate}</p>
        </div>
    )
}

export default TaskItem; 