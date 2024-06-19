import React from 'react';
import { ITask } from '../../../server/src/models/tasks';
import TaskItem from './TaskItem'; // Assuming TaskItem is in the same directory
import '../App.css';

interface TaskListProps {
    tasks: ITask[];
    onTaskUpdated: () => void; 
    onTaskDeleted: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
    return (
        <div className="task-list">
            <div className='task-list-header-div'>
             <h2 className="task-list-header">Task List</h2>
            </div>
            <div className="task-items-container">
                {tasks.map(task => (
                    <TaskItem 
                        key={task._id} 
                        task={task}
                        onTaskUpdated={onTaskUpdated}
                        onTaskDeleted={onTaskDeleted}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskList;
