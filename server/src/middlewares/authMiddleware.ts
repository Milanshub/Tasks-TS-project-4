import { Request, Response, NextFunction } from "express";
//imported middleware for express to authorize client 
import jwt from "jsonwebtoken"; 

// Global augmentation to extend the Request interface within the express module
declare global {
    namespace Express {
        interface Request {
            user?: string | jwt.JwtPayload;
        }
    }
}

// authentication middleware to protect certain routes 
// next (a function to pass control to the next middleware)
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // attempts to get the token
    const token = req.header('Authorization'); 
    if (!token) {
        // 401 status 'access denied'
        return res.status(401).send('Access denied. No token provided'); 
    }

    try {
        //verifies the authenticity of the JWT token (token) by checking its signature against the provided secret key
        const decoded =  jwt.verify(token, process.env.JWT_SECRET!);
        //assigns the decoded token to req.user
        req.user = decoded; 
        next(); 
    } catch (error) {
        // 400 status 'bad request'
        res.status(400).send('Invalid token'); 
    }
}; 
