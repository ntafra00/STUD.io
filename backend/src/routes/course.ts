import { Router, Request, Response, NextFunction } from "express";
import { createCourse, deleteCourse, getCourse, getCourseById, getStudentCourses, getProfessorCourses, updateCourse, getUser, addStudentToCourse, getStudentCourseById, getTasks } from "../db/db";
import CourseResult from "../models/dbResults/course";
import {CourseTasks} from "../models/dbResults/courseTasks"
import { authMiddleware } from "../helpers/middleware";

const addTasksToCourse = async (courses: CourseResult[]) => {
     
    for (let i = 0; i < courses.length; i++)
    {   
        let tasks: CourseTasks[] | null = await getTasks(courses[i].id);
        courses[i] = {...courses[i], tasks: tasks}
    }
}


const courseRouter = Router();

courseRouter.post("/", authMiddleware, async (req:Request, res:Response) => {
    
    const courseExists = await getCourse(req.body.name);

    if(courseExists)
    {
        return res.status(400).send({
            "message": "Course with that name already exists"
        })
    }
        
    const createdCourse = await createCourse({...req.body, professorId: req.session.user!.id});

    if(createdCourse)
    {
        return res.status(200).send({
            "message": "Course created",
            "data": createdCourse
        })
    }else{
        return res.status(400).send({
            "message": "Invalid course data"
        })
    }
})

courseRouter.get("/", authMiddleware, async (req: Request, res: Response) => {
    if(req.session.user?.role === 'student')
    {
        const courses = await getStudentCourses(req.session.user.id);
        if(courses)
        {
            return res.status(200).send({
                "message": "Success",
                "data": courses
            })
        }
    }else{
        const courses: CourseResult[] | null = await getProfessorCourses(req.session.user!.id);
        if(courses)
        {
            await addTasksToCourse(courses);
            return res.status(200).send({
                "message": "Success",
                "data": courses
            })
        }
    }
    res.status(404).send({
        "message": "No available courses"
    })
})

courseRouter.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
    const {id} = req.params;
    const courseExists = await getCourseById(Number(id));

    if(!courseExists)
    {
        return res.status(404).send({
            "message": "Course does not exist"
        })
    }else{
        const deletedCourse = await deleteCourse(Number(id))
        if(deletedCourse)
            return res.status(200).send({
                "message": "Course succesfully deleted"
            })
    }
})

courseRouter.put("/:id", authMiddleware, async (req: Request, res: Response) => {
    const {id} = req.params;
    let courseExists = await getCourseById(Number(id));

    if(!courseExists)
    {
        return res.status(404).send({
            "message": "Course does not exist"
        })
    }else{
        courseExists = await getCourse(req.body.name);

        if(courseExists)
            return res.status(400).send({"message": "Course with given name already exists"})

        const editedCourse = await updateCourse({id: Number(id), name: req.body.name})
        if(editedCourse)
            return res.status(200).send({
                "message": "Course succesfully updated"
            })
        res.status(400).send({
            "message": "Course not updated"
        })
    }
})

courseRouter.post("/student", authMiddleware, async (req: Request, res: Response) => {
    const {id, email, courseId} = req.body;

    let studentExists = await getUser(email);    
    if(studentExists === null)
        return res.status(404).send({
            "message": "Student with given email does not exist"
        })

    let courseExists = await getCourseById(courseId);  
    if(courseExists === null)
        return res.status(404).send({
            "message": "Course with that ID does not exist"
        })    

    let studentAlreadyAdded = await getStudentCourseById(Number(req.session.user?.id), courseId);
    if(studentAlreadyAdded)
        return res.status(400).send({
            "message": "Student is already added to that course"
        })

    let studentAddedToCourse = await addStudentToCourse(id, courseId);
    if(!studentAddedToCourse)
        return res.status(400).send({
            "message": "Student not added to course"
        })

    res.status(200).send({
        "message": "Student succesfully added to course",
    })  
})

export {courseRouter};