/// <reference types="node" />

import path from "path";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import taskRouter from './routes/taskRouters';
import {log} from "./utils/logger";
import cors from 'cors';


dotenv.config();

const app = express();
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

const uri = process.env.MONGODB_URI;
if (!uri) {
    log('MongoDB URI is not defined in the environment variables.');
    process.exit(1); // Exit the process if MongoDB URI is not defined
}

// Set strictQuery option to suppress the warning
mongoose.set('strictQuery', false); 


//connection to mongoose database,using uri and send back a response 
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true } as any, (err) => {
    if (err) {
        log(`Could not connect to MongoDB: ${err.message}`);
    } else {
        log('Connected to MongoDB');
    }
});

app.use('/api', taskRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

const port = process.env.PORT;
app.listen(port, () => {
    log(`Server is running on port ${port}`);
});
