import React, { useEffect } from "react"
import Heading from "../../components/Heading";
import { StyledContainer, ContentWrapper } from "../../index.styled"
import Drawer from "../../components/Drawer/Drawer";
import API from "../../utils/api/api";
import Task from "../../models/task";
import TaskList from "./TaskList";
import { TasksContainer}from "./index.styled"

const Tasks: React.FC = () => {

    const [tasks, setTasks] = React.useState<Task[]>([])

    useEffect(() => {
        const getTasks = async () => {
            try {
                let response = await API.get("/task/1")
                if(response.status === 200)
                {
                    setTasks([...tasks, ...response.data.data])
                }
                    
            } catch (error) {
                console.log(error);
            }
        }
        getTasks();
    }, [])

    return (
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Tasks"></Heading>
                <TasksContainer>
                    <TaskList tasks={tasks}></TaskList>
                </TasksContainer>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Tasks;