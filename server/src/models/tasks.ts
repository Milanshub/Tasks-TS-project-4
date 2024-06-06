// "schemma" defines how your data should look like, "Document" is the object i.e Task 
import mongoose, {Schema, Document} from "mongoose";


// How the object should look, types and adhere to Document mongoose 
export interface ITask extends Document {
    title: string; 
    description: string; 
    status: string; 
    dueDate: Date;
};

// creat schema for the above interface 
const taskSchema: Schema = new Schema({
    title:{type: String, required: true}, 
    description:{type: String, requried: true}, 
    status:{type: String, requireed: true, enum: ['pending', 'in-progress', 'completed']}, 
    dueDate:{type: Date, required: true}
});

//exports the Task model with the specified schema and TypeScript interface
export const Task =  mongoose.model<ITask>('Task', taskSchema); 
