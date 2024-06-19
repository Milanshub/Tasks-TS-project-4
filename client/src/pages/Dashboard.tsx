import * as React from 'react';
// axios installed to do http requests to backend "service" folder 
import axios from 'axios';
import { ITask } from '../../../server/src/models/tasks';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import '../App.css'; 

const Dashboard: React.FC = () => {
    //hold the list of tasks fetched from the backend.
    const [tasks, setTasks] = React.useState<ITask[]>([]);
    //tracks whether the data is still being fetched
    const [loading, setLoading] = React.useState<boolean>(true);
    //hold any error messages if fetching data fails
    const [error, setError] = React.useState<string | null>(null);

    
    const fetchData = async (): Promise<void> => {
        try {
            const response = await axios.get<ITask[]>('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            setError('Error fetching tasks');
            console.error('Error fetching tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleTaskAdded = () => {
        fetchData();
    };

    const handleTaskUpdated = () => {
        fetchData();
    }; 

    const handleTaskDeleted = () => {
        fetchData();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-header">Keeper</h1>
            <AddTask onTaskAdded={handleTaskAdded} />
            <TaskList tasks={tasks} onTaskUpdated={handleTaskUpdated} onTaskDeleted={handleTaskDeleted}/>
        </div>
    );
};

export default Dashboard;