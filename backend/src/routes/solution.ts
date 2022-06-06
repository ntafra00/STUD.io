import {Router, Request, Response} from "express"
import fs from "fs"
import crypto from "crypto"
import path from "path"
import { BASE_FILE_PATH } from "../constants";
import { createSolution, deleteSolution, getAllSolutions, getSolution, getSolutionById, getSolutionGraphData, getStudentSolutions, getTasks, markSolution, setSolutionAsChecked } from "../db/db";
import { SolutionResult } from "../models/dbResults/solution";
import { authMiddleware } from "../helpers/middleware";

const solutionRouter: Router =  Router();

solutionRouter.post("/", authMiddleware, async (req:Request, res:Response) => {

    console.log(req.body);
    console.log(req.files);

    if(!req.files){
        return res.status(400).send({
            "message": "Missing files"
        })
    }

    const solutionExists = await getSolution({taskId: req.body.taskId, studentId: req.session.user!.id })

    if(solutionExists)
        return res.status(400).send({"message": "Solution for that task is already given"})

    const userFile: any = req.files.file;
    const randomString = crypto.randomBytes(8).toString("hex");
    const cryptedFileName = `${randomString}${userFile.name}`
    const filePath = path.join(BASE_FILE_PATH, cryptedFileName);

    if(!fs.existsSync(filePath)){
        userFile.mv(filePath, (err) => {
            if(err)
                return res.send(err)
        })
    }

    const solutionCreated = await createSolution({...req.body, fileName: cryptedFileName, studentId: req.session.user?.id})

    if(!solutionCreated)
        return res.status(400).send({"message": "Solution not created"});
    
    res.status(200).send({
        "message": "File uploaded",
        "data": solutionCreated
    })
});


solutionRouter.delete("/", authMiddleware, async (req:Request, res:Response) => {
    const {id} = req.query;

    const solutionExists: SolutionResult = await getSolutionById(Number(id));
    
    if(!solutionExists)
        return res.status(404).send({"message": "Solution does not exist"});

    const filePath = path.join(BASE_FILE_PATH, String(solutionExists.file_name));
    const solutionDeleted = await deleteSolution(Number(id));

    if(!solutionDeleted)
        return res.send(400).send({"message": "Solution not deleted"});

    fs.unlinkSync(filePath);
    res.status(200).send({"message": "Solution succesfully deleted"});
})

solutionRouter.get("/", authMiddleware, async (req: Request, res:Response) => {
    const {id, role} = req.session.user!;

    if(role === "student")
    {
        let studentSolutions = await getStudentSolutions(Number(id));
        if(studentSolutions)
            return res.status(200).send({
                "message": "Success",
                "data": studentSolutions
            })
    }else{
        let professorSolutions = await getAllSolutions("Not given")
        if(professorSolutions)
        {
            let tasks = await getTasks(1);
            return res.status(200).send({
                "message": "Success",
                "data": {
                    "professorSolutions": professorSolutions,
                    "tasks": tasks
                }
            })
        }     
    }

    res.status(404).send({
        "message": "There aren't any solutions"
    })
})

solutionRouter.put("/", authMiddleware, async (req: Request, res: Response) => {
    const {id, mark, description} = req.body;

    if(mark)
    {let solutionMarked = await markSolution({id, mark, description})
    if(!solutionMarked)
        return res.status(400).send({
            "message": "Solution was not marked"
        })
    }else {
        let solutionChecked = await setSolutionAsChecked(id);
        if(!solutionChecked)
            return res.status(400).send({
                "message": "Solution not checked"
            })
    }  
    res.status(200).send({
        "message": "Success"
    })
})

solutionRouter.get("/progress", authMiddleware, async (req: Request, res: Response) => {
    const studentID = req.session.user?.id;

    let graphData = await getSolutionGraphData(Number(studentID))
    if(!graphData)
        return res.status(404).send({
            "message": "There isn't any marked solution"
        })

    res.status(200).send({
        "message": "Success",
        "data": graphData
    })
})

export {solutionRouter}
