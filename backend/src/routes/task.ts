import {Router, Request, Response} from "express";
import { createTask, getTask, getTasks, getTaskById, updateTask, deleteTask, checkForTask, getSolution } from "../db/db";
import { authMiddleware } from "../helpers/middleware";
import { CourseTasks } from "../models/dbResults/courseTasks";
import { SolutionResult } from "../models/dbResults/solution";

const findSolutions = async (tasks: CourseTasks[], unsolvedTasks: CourseTasks[] | null, studentId: number) => {
    let solution: SolutionResult | null
    for(let i = 0; i < tasks.length; i++)
    {
        solution = await getSolution({taskId: tasks[i].id, studentId: studentId});
        if(solution === null)
        {
            unsolvedTasks?.push(tasks[i]);
        } 
    }
}
const findTasks = async (courseId: number, unsolvedTasks: CourseTasks[] | null, studentId: number) => {
    let tasks: CourseTasks[] | null
    tasks = await getTasks(courseId);
        if(tasks)
            await findSolutions(tasks, unsolvedTasks, studentId)
}

const taskRouter: Router = Router();

taskRouter.get("/", async (req:Request, res:Response) => {
    const id = req.query.id;
    const user = req.session.user;
    
    if(user?.role === "professor")
    {
        const tasks = await getTasks(Number(id));
        if(tasks)
            return res.status(200).send({"message": "Success", "data": tasks})
    }else{
        let unsolvedTasks: CourseTasks[] | null = [];
        await findTasks(Number(id), unsolvedTasks, user!.id) 
        if(unsolvedTasks !== [])
            return res.status(200).send({"message": "Success", "data": unsolvedTasks})
    }    
    res.status(404).send({"message": "There aren't any tasks"})
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
    const id = req.query.id;
    let doesTaskExist = await getTaskById(Number(id));

    if(!doesTaskExist)
        return res.status(404).send({"message": "Task does not exist"});
    
    doesTaskExist = await checkForTask(req.body.name, Number(id));

    if(doesTaskExist)
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
    const id = req.query.id;
    const checkForTask = await getTaskById(Number(id));
    
    if(!checkForTask)
        return res.status(404).send({"message": "Task does not exist"});

    const taskDeleted = await deleteTask(Number(id));

    if(!taskDeleted)
        return res.status(400).send({"message": "Task not deleted"});

    res.status(200).send({"message": "Task succesfully deleted"});
})


export {taskRouter};