import { Router, Request, Response, NextFunction } from "express";
import { createCourse, deleteCourse, getCourse, getCourseById, getStudentCourses, getProfessorCourses, updateCourse } from "../db/db";
import CourseResult from "../models/dbResults/course";
// import { authMiddleware } from "../helpers/middleware";

const courseRouter = Router();

courseRouter.post("/", async (req:Request, res:Response) => {
    
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

courseRouter.get("/", async (req: Request, res: Response) => {
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
        const courses = await getProfessorCourses(req.session.user!.id);
        if(courses)
        {
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

courseRouter.delete("/:id", async (req: Request, res: Response) => {
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

courseRouter.put("/:id", async (req: Request, res: Response) => {
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

export {courseRouter};