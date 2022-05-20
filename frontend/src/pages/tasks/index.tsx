import React, { useEffect, useContext } from "react"
import Heading from "../../components/Heading";
import { StyledContainer, ContentWrapper } from "../../index.styled"
import Drawer from "../../components/Drawer/Drawer";
import { TaskContext } from "../../context/contexts/taskContext";
import { UserContext } from "../../context/contexts/userContext";
import StudentTasks from "./student";
import ProfessorTasks from "./professor";

const Tasks: React.FC = () => {

    const {state, actions} = useContext(TaskContext);
    const userContext = useContext(UserContext)

    useEffect(() => {
        if(state.tasks.length === 0)
            actions.getTasks();
    }, [userContext.user])

    return (
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Tasks"></Heading>
                {userContext.user.role === "student" ? <StudentTasks/> : <ProfessorTasks/>}
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Tasks;