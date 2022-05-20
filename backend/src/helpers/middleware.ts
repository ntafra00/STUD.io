import { Request, Response, NextFunction } from "express";
import { PERMISSIONS } from "../constants";

const authMiddleware = (req:Request, res:Response, next: NextFunction) => {
    if(!req.session.user)
        return res.sendStatus(401);
    
    const role = req.session.user!.role;
    const httpMethod = req.method;
    let path = req.originalUrl.split("?")[0];
    if (path[path.length - 1] === "/") {
        path = path.slice(0, path.length - 1);
    }
    
    if(PERMISSIONS[path][httpMethod].includes(role))
        next();
    else    
        return res.sendStatus(401);
}

export {authMiddleware}