import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";

export const middleware =  (req:Request,res:Response,next:NextFunction) => {
    const token = req.headers["authorization"] ?? "";
    console.log(token)

    const decoded = jwt.verify(token,JWT_SECRET);
    console.log(decoded)
    

    if(decoded){
        // @ts-ignore
        req.userId = decoded.userId;

        
        next();
    }else{
        return

        res.json({
            message:"user not found"
        })
    }

    
}