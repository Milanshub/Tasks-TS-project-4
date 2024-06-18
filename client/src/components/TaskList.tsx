import React from 'react';
import { ITask } from '../../../server/src/models/tasks';
import TaskItem from './TaskItem'; // Assuming TaskItem is in the same directory
import '../App.css'

interface TaskListProps {
    tasks: ITask[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
    return (
        <div className="task-list">
            <h2>Task List</h2>
            {tasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;