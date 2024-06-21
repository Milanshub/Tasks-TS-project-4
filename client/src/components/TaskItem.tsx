import React, { useState } from 'react';
import '../App.css'; 
import { ITask } from "server/src/models/tasks";
import axios from "axios";


// defines model for TaskItem and its props 
interface TaskItemProps {
    task: ITask; 
    onTaskUpdated: () => void;
    onTaskDeleted: () => void; 
}

// component function thats takes TaskItemProps as pops 
const TaskItem: React.FC<TaskItemProps> = ({task, onTaskUpdated, onTaskDeleted}) => {
    //tracks whether the task is in editing mode 
    const [isEditing, setIsEditing] = useState(false); 
    // keep track of the edited task details
    const [editedTask, setEditedTask] = useState<Partial<ITask>>({ 
        title: task.title, 
        description: task.description,
        status: task.status, 
        dueDate: task.dueDate ? new Date(task.dueDate) : new Date(),
    }); 

    //function updates the editedTask state when the user types in the input fields.
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        // Handle date input separately
        if (name === 'dueDate') {
            setEditedTask(prev => ({
                ...prev,
                dueDate: new Date(value), // Convert string to Date object
            }));
        } else {
            setEditedTask(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // This function sends the updated task details to the server.
    const handleUpdate = async () => {
        try {
            const updatedTask = {
                ...editedTask,
                dueDate: editedTask.dueDate ? new Date(editedTask.dueDate) : undefined, // Convert string back to Date object
            }; 
            // Sends a PUT request to the server with the updated task
            await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updatedTask); 
            //: Sends a PUT request to the server with the updated task
            onTaskUpdated(); 
            //Sets isEditing to false to switch back to view mode
            setIsEditing(false); 
        } catch (error: any){
            console.error('Error updating task', error); 
        }
    }; 

    //function sends a delete request to the server
    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${task._id}`); 
            onTaskDeleted(); 
        } catch (error: any){
            console.error("Error deleting task", error);
        }
    }; 

    return (
        <div className="task-item">
            {isEditing ? (
                <div className="edit-task-form">
                    <input
                        type="text"
                        name="title"
                        value={editedTask.title}
                        onChange={handleEditChange}
                        placeholder="Title"
                        required
                    />
                    <input
                        type="text"
                        name="description"
                        value={editedTask.description}
                        onChange={handleEditChange}
                        placeholder="Description"
                        required
                    />
                    <select 
                        name="status" 
                        value={editedTask.status} 
                        onChange={handleEditChange} 
                        required
                    >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                    <input
                        type="date"
                        name="dueDate"
                        value={editedTask.dueDate ? editedTask.dueDate.toISOString().split('T')[0] : ''}
                        onChange={handleEditChange}
                        required
                    />
                    <div className="task-actions">
                        <button className="btn blue-gradient" onClick={handleUpdate}>Save</button>
                        <button className="btn blue-gradient" onClick={() => setIsEditing(false)}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="task-details">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <p>Status: {task.status}</p>
                    <p>Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</p>
                    <div className="task-actions">
                        <button className="btn blue-gradient" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="btn blue-gradient" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskItem;
