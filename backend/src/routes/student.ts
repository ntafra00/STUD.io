import { Router, Response, Request, NextFunction } from "express";
import { createUser, deleteUser, getUser, getUsers } from "../db/db";
import { authMiddleware } from "../helpers/middleware";
import bcrypt from "bcrypt"

const studentRouter = Router();

studentRouter.get("/", authMiddleware, async (req:Request, res: Response) => {
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

studentRouter.post("/", authMiddleware,  async (req: Request, res: Response) => {
    const {email, password} = req.body;
    const studentExists = await getUser(email);
    
    if(studentExists)
        return res.status(400).send({
            "message": "Student with that email already exists"
        })

    const salt = await bcrypt.genSalt();
    let hashedPassword = await bcrypt.hash(password, salt);

    const insertedStudent = await createUser({...req.body, password: hashedPassword, role: "student"})

    if(!insertedStudent)
        return res.status(400).send({
            "message": "Student is not inserted"
        })
    
    res.status(200).send({
        "message": "Student succesfully inserted",
        "data": insertedStudent
    })
})

studentRouter.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
    const {id} = req.params;
    console.log(id);
    const isDeleted = await deleteUser(Number(id));

    if(!isDeleted)
        return res.status(400).send({
            "messsage": "User is not deleted"
        })

    res.status(200).send({
        "message": "User succesfully deleted"
    })
})

export {studentRouter};