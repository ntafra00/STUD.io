import { Router, Response, Request, NextFunction } from "express";
import { deleteUser, getUsers } from "../db/db";
import { authMiddleware } from "../helpers/middleware";

const router = Router();

router.get("/", authMiddleware, async (req:Request, res: Response) => {
    const students = await getUsers("student")

    if(!students)
        return res.status(404).send({
            "message": "No students in database"
        })
    
    res.status(200).send({
        "message": "Success",
        "data": students
    })
})

router.post("/", authMiddleware,  async (req: Request, res: Response) => {
    
})

router.delete("/id", authMiddleware, async (req: Request, res: Response) => {
    const isDeleted = await deleteUser(req.body.email);

    if(isDeleted)
        return res.status(200).send({
            "message": "User successfully deleted"
        })
})

router.put("/id", authMiddleware, async (req: Request, res: Response) => {
    const {id}  = req.params;
})


export {router};