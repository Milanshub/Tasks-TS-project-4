import { Tasks } from "../models/tasks"

let TASKS: Tasks[] = []

export const getTasks = (): Tasks[] => {
    return TASKS
}

export const createTask = (newTask: Tasks): Tasks => {
    const taskId = TASKS.length + 1;
    const taskWithId = { ...newTask, id: taskId };
    TASKS.push(taskWithId);
    return taskWithId;
};

export const updateTasks = 

export const deleteTasks = 

