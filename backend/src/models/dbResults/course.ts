import {CourseTasks} from "./courseTasks"
 
interface CourseResult {
    id: number,
    courseName: string,
    tasks: CourseTasks[] | null,
}

export default CourseResult;