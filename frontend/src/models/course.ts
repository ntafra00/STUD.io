import Task from "../models/task"

interface Course {
    id: number,
    name: string,
    tasks: Task[],
}

export default Course;