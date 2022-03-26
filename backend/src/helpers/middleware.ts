import { Request, Response, NextFunction } from "express";

const authMiddleware = (req:Request, res:Response, next: NextFunction) => {
    if(!req.session.user)
        return res.sendStatus(401);
    next();
}

export {authMiddleware}