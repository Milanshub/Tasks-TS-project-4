import { MongoClient } from "mongodb";  
import dotenv from 'dotenv'; 


//connect dotenv 
dotenv.config(); 

// connect to mongo uri link 
const uri = process.env.MONGODP_URI!; 


// Asynchronous arrow function to connect to MongoDB and use that function elsewhere in the app 
export const connectToMongoDB = async () => {
    const client = new MongoClient(uri);
    try {
        await client.connect(); 
        console.log("Connected to MongoDB Atlas"); 

        return client; 
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        throw error;
    }

}





