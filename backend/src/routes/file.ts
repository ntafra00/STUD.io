import { Router, Request, Response } from "express";
import { authMiddleware } from "../helpers/middleware";
import { BASE_FILE_PATH } from "../constants";
import path from "path"


const fileRouter = Router();

fileRouter.get("/", authMiddleware, (req: Request, res: Response) => {
    const fileName = req.query.fileName;
    const filePath = path.join(BASE_FILE_PATH, String(fileName)); 

    res.download(filePath);
})

export {fileRouter}