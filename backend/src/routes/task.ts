import {Router, Request, Response} from "express";
import { createTask, getTask, getTasks, getTaskById, updateTask, deleteTask } from "../db/db";
import { authMiddleware } from "../helpers/middleware";

const taskRouter: Router = Router();

taskRouter.get("/", async (req:Request, res:Response) => {
    const id = req.query.id;
    console.log(id);
    const tasks = await getTasks(Number(id));

    if(!tasks)
        return res.status(404).send({"message": "There aren't any tasks"})

    res.status(200).send({"message": "Success", "data": tasks});
})

taskRouter.post("/", authMiddleware, async (req:Request, res:Response) => {
    const checkForTask = await getTask(req.body.name);

    if(checkForTask)
        return res.status(400).send({"message": "Task with given name already exists"});
    
    const taskCreated = await createTask(req.body);
    if(!taskCreated)
        return res.status(400).send({"message": "Task not created"})
    
    res.status(200).send({
        "message": "Task succesfully created",
        "data": taskCreated
    })
});

taskRouter.put("/", authMiddleware, async (req:Request, res: Response) => {
    const id = req.query;
    let checkForTask = await getTaskById(Number(id));

    if(!checkForTask)
        return res.status(404).send({"message": "Task does not exist"});
    
    checkForTask = await getTask(req.body.name);

    if(checkForTask)
        return res.status(400).send({"message": "Task with given name already exists"});
    
    const taskUpdated = await updateTask({id: Number(id), name: req.body.name, expirationDate: req.body.expirationDate});

    if(!taskUpdated)
        return res.status(400).send({"message": "Task not updated"})
    
    res.status(200).send({
        "message": "Task succesfully updated",
        "data": taskUpdated
    })
})


taskRouter.delete("/", authMiddleware, async (req:Request, res:Response) => {
    const id = req.query;
    const checkForTask = await getTaskById(Number(id));
    
    if(!checkForTask)
        return res.status(404).send({"message": "Task does not exist"});

    const taskDeleted = await deleteTask(Number(id));

    if(!taskDeleted)
        return res.status(400).send({"message": "Task not deleted"});

    res.status(200).send({"message": "Task succesfully deleted"});
})


export {taskRouter};