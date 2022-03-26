import { Router, Request, Response, NextFunction } from "express";
import { getProfessorCourses } from "../db/courses";
import { authMiddleware } from "../helpers/middleware";

const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
    if(req.session.user?.role === 'student')
    {
        // obavi radnje za studenta
    }else{
        // obavi radnje za profesora
    }

    // 1. case
})
export {router}