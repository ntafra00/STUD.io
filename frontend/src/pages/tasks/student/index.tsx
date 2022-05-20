import React from "react"
import { TasksContainer } from "./index.styled";
import TaskList from "./TaskList";

const StudentTasks = () => {
    return (
        <TasksContainer>
            <TaskList/>
        </TasksContainer>
    )
}

export default StudentTasks;