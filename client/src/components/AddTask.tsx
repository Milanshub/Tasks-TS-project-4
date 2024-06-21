import React, { useState } from 'react';
// axios, client for making requests to the backend API
import axios from 'axios';
import '../App.css'; 

// interface model for AddTask 
interface AddTaskProps {
    onTaskAdded: () => void; 
}

//AddTask: A functional component that takes AddTaskProps as props
const AddTask: React.FC<AddTaskProps> = ({ onTaskAdded }) => {
    //Four state variables to hold form data and one to handle errors:
    const [title, setTitle] = useState<string>(""); 
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<string>("pending"); 
    const [dueDate, setDueDate] = useState<string>(""); 
    const [error, setError] = useState<string | null>(null);  

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
           // Sends a POST request to the backend API to create a new task
            await axios.post('http://localhost:5000/api/tasks', { title, description, status, dueDate });
            //Resets the form fields and error state upon successful submission
            setTitle("");
            setDescription("");
            setStatus("pending"); // Reset to default value
            setDueDate("");
            setError(null);
            onTaskAdded();
        } catch (error: any) {
            //catch error and respond 
            setError("Error adding task: " + error.response.data.error);
            console.error('Error adding task:', error);
        }
    }

    return (
        <div className="add-task-form">
            <h2>Add Task</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Description"
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
                            <option value="pending">Pending</option>
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
