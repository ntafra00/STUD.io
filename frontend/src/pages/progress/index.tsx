import React from "react"
import Drawer from "../../components/Drawer/Drawer";
import { StyledContainer, ContentWrapper } from "../../index.styled";
import Heading from "../../components/Heading";

const Progress: React.FC = () => {
    return(
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Progress"></Heading>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Progress;