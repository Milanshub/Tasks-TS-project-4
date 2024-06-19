// import interface and schema from model file
import mongoose from "mongoose";
import { Task, ITask } from "../models/tasks";

//code provides CRUD (Create, Read, Update, Delete) operations for a Task model in a MongoDB database using Mongoose.

// function creating and saving new task in the database 
export const createTask = async (taskData: ITask): Promise<ITask> =>{
    const task = new Task(taskData); 
    return await task.save(); 
};

//function retrieves all tasks from the database
export const getTask = async (): Promise<ITask[]> => {
    return await Task.find().exec(); 
}

// function get task by id 
export const getTaskById = async (id: string): Promise<ITask | null> => {
    const objectId = mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null; 
    if (!objectId){
        throw new Error('Invalid Task ID format'); 
    }
    return await Task.findById(id).exec(); 
} 

// function updates and existing task. "Partial" can update all or some data 
export const updateTask = async(id:string, taskData:Partial<ITask>): Promise <ITask | null> =>{ 
    const objectId = mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null; 
    if (!objectId){
        throw new Error('Invalid Task ID format'); 
    }
    // tells the db to find by id, change to taskData and return new 
    return await Task.findByIdAndUpdate(id, taskData,{new: true}).exec(); 
}   

// function that finds by id and deletes task
export const deleteTask = async(id: string): Promise <ITask | null> =>{
    const objectId = mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null; 
    if (!objectId){
        throw new Error('Invalid Task ID format'); 
    }
    return await Task.findByIdAndDelete(id).exec(); 
}