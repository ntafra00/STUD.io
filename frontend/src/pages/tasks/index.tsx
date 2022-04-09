import React from "react"
import Heading from "../../components/Heading";
import { StyledContainer, ContentWrapper } from "../../index.styled"
import Drawer from "../../components/Drawer/Drawer";

const Tasks: React.FC = () => {
    return (
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Tasks"></Heading>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Tasks;