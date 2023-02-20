import { Request, Response } from "express";

export const auth = (req:Request, res:Response, next) =>{
   
if(req.headers['authorization']){
    next();
}
else{
    res.status(404).json({message:"Token not found"});
}
}