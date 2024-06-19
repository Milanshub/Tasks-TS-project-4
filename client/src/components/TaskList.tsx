import React from 'react';
import { ITask } from '../../../server/src/models/tasks';
import TaskItem from './TaskItem'; // Assuming TaskItem is in the same directory
import '../App.css'

interface TaskListProps {
    tasks: ITask[];
    onTaskUpdated: () => void; 
    onTaskDeleted: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
    return (
        <div className="task-list">
            <h2>Task List</h2>
            {tasks.map(task => (
                <TaskItem 
                    key={task.id} 
                    task={task}
                    onTaskUpdated={onTaskUpdated}
                    onTaskDeleted={onTaskDeleted}
                    />
            ))}
        </div>
    );
};

export default TaskList;