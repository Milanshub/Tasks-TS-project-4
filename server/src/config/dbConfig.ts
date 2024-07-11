import { MongoClient } from "mongodb";  
import dotenv from 'dotenv'; 
import { log } from "../utils/logger";

//connect dotenv 
dotenv.config(); 

// connect to mongo uri link /kf
const uri = process.env.MONGODB_URI!; 


// Asynchronous arrow function to connect to MongoDB and use that function elsewhere in the app 
export const connectToMongoDB = async () => {
    const client = new MongoClient(uri);
    try {
        await client.connect(); 
        log("Connected to MongoDB Atlas"); 

        return client; 
    } catch (error) {
        log(`Error connecting to MongoDB Atlas: ${error}`);
        throw error;
    }

}





