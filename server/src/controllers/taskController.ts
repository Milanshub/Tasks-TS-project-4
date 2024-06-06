import { Request, Response } from "express";
// import all instances from taskService
import * as taskService from "../services/taskServices"; 

// custom type is created so the code is not repetetive 
type ExpressRequestHandle = (req: Request, res: Response) => Promise<void>


// function that await req for createTask from service, saves as req.body
// and responds with a status 
export const createTask: ExpressRequestHandle = async (req, res) => {
    try {
        const task = await taskService.createTask(req.body); 
        // 201 status 'created'
        res.status(201).json(task);
    } catch (error:any){
        // 400 status 'bad request' 
        res.status(400).json({error: error.message});
    }
}; 


// function that awaits getTasks from service, and responds with status and array of tasks
export const getTask: ExpressRequestHandle = async (_, res) => {
    try {
        const task = await taskService.getTask();  
        // 200 status 'ok" 
        res.status(200).json(task);
    } catch (error:any){
        // 400 status 'bad request' 
        res.status(400).json({error: error.message});
    }
};

// function that await getTaskById from service, and responds with status 
export const getTaskById: ExpressRequestHandle = async (req, res) => {
    try {
        // ID as a route parameter
        const task = await taskService.getTaskById(req.params.id);
        if (task){
            // 200 status 'ok" 
            res.status(200).json(task);
        } else {
            //404 status "not found"
            res.status(404).json({error: "Task not found!"});
        } 
    } catch (error:any) {
         // 400 status 'bad request' 
        res.status(400).json({error: error.message})
    }
};


// function that awaits updateTask from service, and responds with status
export const updateTask: ExpressRequestHandle = async (req, res) => {
    try {
        // id as a route parameter and req body from the client 
        const task = await taskService.updateTask(req.params.id, req.body);
        if (task) {
            // 200 status 'ok" 
            res.status(200).json(task);
        } else {
            //404 status "not found"
            res.status(404).json({error: "Task not found!"});
        }
    } catch (error:any){
        // 400 status 'bad request' 
        res.status(400).json({error: error.message});
    } 
};

// function that awaits deleteTask from service, and responds with status 
export const deleteTask: ExpressRequestHandle = async (req, res) => {
    try {
        // id as a parameter for query 
        const task = await taskService.deleteTask(req.params.id);
        if (task) {
            // 200 status "ok"
            res.status(200).json({message: "Task deleted!"});
        } else {
            // 400 status "not found"
            res.status(404).json({error: "Task not found!"}); 
        }
    } catch (error:any) {
        //400 status "bad request"
        res.status(400).json({error: error.message});
    }
};