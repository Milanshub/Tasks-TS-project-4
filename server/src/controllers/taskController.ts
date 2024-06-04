import { Tasks } from "../models/tasks"

let TASKS: Tasks[] = []

export const getTasks = (): Tasks[] => {
    return TASKS
}

export const createTasks = (newTask: Tasks): Tasks => {
    // created a new id 
    const taskId = TASKS.length + 1;
    // pushed taks with new id to the array
    const taskWithId = { ...newTask, id: taskId };
    TASKS.push(taskWithId);
    return taskWithId;
};

export const updateTasks = (taskId: number, updatedTask: Partial<Tasks>): Tasks | undefined => {
    const taskIndex = TASKS.findIndex(TASKS => TASKS.id === taskId);
    if (taskIndex !== -1) {
        TASKS[taskIndex] = { ...TASKS[taskIndex], ...updatedTask };
        return TASKS[taskIndex];
    }
    return undefined; // Task not found
};

export const deleteTasks = (taskId: number): boolean => {
    const initialLength = TASKS.length;
    TASKS = TASKS.filter(TASKS => TASKS.id !== taskId);
    return TASKS.length !== initialLength; // Returns true if task was deleted
};
