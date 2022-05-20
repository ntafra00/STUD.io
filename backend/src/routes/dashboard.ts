import { Router, Request, Response } from "express";
import { getProfessorCourses, getSolution, getSolutionByTaskId, getStudentCourses, getTasks } from "../db/db";
import { CourseTasks } from "../models/dbResults/courseTasks";
import { SolutionResult } from "../models/dbResults/solution";
import { StudentCourse } from "../models/dbResults/studentCourse";
import { ProfessorCourse } from "../models/dbResults/professorCourse";
import { authMiddleware } from "../helpers/middleware";

const findSolutions = async (tasks: CourseTasks[], unsolvedTasks: CourseTasks[] | null, markedSolutions: SolutionResult[] | null, studentId: number) => {
    let solution: SolutionResult | null
    for(let i = 0; i < tasks.length; i++)
    {
        solution = await getSolution({taskId: tasks[i].id, studentId: studentId});
        if(solution === null)
        {
            unsolvedTasks?.push(tasks[i]);
        }
        else
        {
            markedSolutions?.push(solution);
        }
            
    }
}
const findTasks = async (courses: StudentCourse[], unsolvedTasks: CourseTasks[] | null, markedSolutions: SolutionResult[] | null, studentId: number) => {
    let tasks: CourseTasks[] | null
    for(let i = 0; i < courses.length; i++)
    {
        tasks = await getTasks(courses[i].id);
        if(tasks)
        {
            await findSolutions(tasks, unsolvedTasks, markedSolutions, studentId)
        }
    }
}

const getNewSolutions = async (tasks: CourseTasks[], addedSolutions: SolutionResult[] | null) => {
    let solutions: SolutionResult[] | null;
    for(let i = 0; i < tasks.length; i++)
    {
        solutions = await getSolutionByTaskId(tasks[i].id);
        if(solutions !== null)
        {
            solutions.forEach((solution) => addedSolutions?.push(solution))
        }
    }
}

const getAllTasks = async (courses: ProfessorCourse[], addedSolutions: SolutionResult[] | null) => {
    let tasks: CourseTasks[] | null
    for(let i = 0; i < courses.length; i++)
    {
        tasks = await getTasks(courses[i].id);
        if(tasks)
        {
            await getNewSolutions(tasks, addedSolutions)
        }
    }
}
const dashboardRouter = Router();

dashboardRouter.get("/", authMiddleware, async (req: Request, res: Response) => {
    if(req.session.user!.role === "professor" )
    {
        const professorCourses: ProfessorCourse[] | null = await getProfessorCourses(Number(req.session.user!.id));
        if(professorCourses === null)
            return res.status(404).send({
                "message": "There aren't any courses"
            })
        const addedSolutions: SolutionResult[] | null = [];
        await getAllTasks(professorCourses, addedSolutions);
        res.status(200).send({
            "message": "Success",
            "data": {
                "addedSolutions": addedSolutions.filter((solution) => solution.mark === "Not given")
            }
        })
    }else
    {
        const studentCourses: StudentCourse[] | null = await getStudentCourses(Number(req.session.user?.id));
        if(studentCourses === null)
            return res.status(404).send({
                "message": "Student isn't enroled to any course"
            })
        let unsolvedTasks: CourseTasks[] | null = [];
        let markedSolutions: SolutionResult[] | null = []
        await findTasks(studentCourses, unsolvedTasks, markedSolutions, req.session.user!.id);
        res.status(200).send({
            "message": "Success",
            "data": {
                "unsolvedTasks": unsolvedTasks,
                "markedSolutions": markedSolutions.filter((solution) => solution.mark !== "Not given"), 
            }
        })
    }
})

export {dashboardRouter};