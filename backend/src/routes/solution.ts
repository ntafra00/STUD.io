import {Router, Request, Response} from "express"
import fs from "fs"
import crypto from "crypto"
import path from "path"
import { BASE_FILE_PATH } from "../constants";
import { createSolution, deleteSolution, getSolution, getSolutionById } from "../db/db";
import { SolutionResult } from "../models/dbResults/solution";

const solutionRouter: Router =  Router();

solutionRouter.post("/", async (req:Request, res:Response) => {
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


solutionRouter.delete("/:id", async (req:Request, res:Response) => {
    const {id} = req.params;

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


export {solutionRouter}
