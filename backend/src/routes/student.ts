import { Router, Response, Request, NextFunction } from "express";
import { addStudentToCourse, createUser, deleteUser, getUser, getUsers, updateStudent } from "../db/db";
import { authMiddleware } from "../helpers/middleware";
import bcrypt from "bcrypt"
import {UserResult} from "../models/dbResults/user"

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

    const insertedStudent: UserResult = await createUser({...req.body, password: hashedPassword, role: "student"})

    if(!insertedStudent)
        return res.status(400).send({
            "message": "Student is not inserted"
        })
    
    await addStudentToCourse(insertedStudent.id, 1);
    
    res.status(200).send({
        "message": "Student succesfully inserted",
        "data": {
            "id": insertedStudent.id,
            "email": insertedStudent.email,
            "full_name": insertedStudent.full_name
        }
    })
})

studentRouter.delete("/", authMiddleware, async (req: Request, res: Response) => {
    const id = req.query.id;
    const isDeleted = await deleteUser(Number(id));

    if(!isDeleted)
        return res.status(400).send({
            "messsage": "User is not deleted"
        })

    res.status(200).send({
        "message": "User succesfully deleted"
    })
})

studentRouter.put("/", authMiddleware, async (req: Request, res: Response) => {
    const id = req.query.id;
    const emailInUse = await getUser(req.body.email);

    if(emailInUse)
        return res.status(400).send({
            "message": "User with that email already exists"
        })

    await updateStudent({email: req.body.email, fullName: req.body.fullName, id: Number(id)})

    res.status(200).send({
        "message": "Data succesfully edited"
    })
})

export {studentRouter};