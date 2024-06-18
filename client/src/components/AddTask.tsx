import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'; 

// Define props interface for AddTask component
interface addTaskProps{
    onTaskAdded:() => void; 
}

const AddTask: React.FC <addTaskProps> = ({onTaskAdded}) => {
    // State variables for task details and error handling
    const [title, setTitle] = useState<string>(""); 
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<string>("pending"); 
    const [dueDate, setDueDate] = useState<string>(""); 
    const [error, setError] = useState<string | null>(null);  

    const handleSubmit = async (e: React.FormEvent)=> {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            await axios.post('http://localhost:5000/api/tasks', {title, description, status, dueDate});
            setTitle("");
            setDescription("");
            setStatus("");
            setDueDate("");
            setError(null);
            
            // Notify parent component to refresh task list
            onTaskAdded();
        } catch (error:any) {
            setError("Error adding task: " + error.response.data.error); // Display backend error message
            console.error('Error adding task:', error)
        }
    }

    return (
        <div>
        <h2>Add Task</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </label>
            </div>
            <div>
                <label>
                    Status:
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="pending">pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </label>
            </div>
            <div>
                <label>
                    Due Date:
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </label>
            </div>
            <button type="submit">Add Task</button>
        </form>
    </div>
    );
};

export default AddTask; 