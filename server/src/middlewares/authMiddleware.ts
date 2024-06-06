import { Request, Response, NextFunction } from "express";
//imported middleware for express to authorize client 
import jwt from "jsonwebtoken"; 

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization'); 
    if (token) {
        return res.status(401).send('Access denied. No token provided'); 
    }
}
