import React from "react"
import Heading from "../../components/Heading";
import { StyledContainer, ContentWrapper } from "../../index.styled"
import Drawer from "../../components/Drawer/Drawer";

const Solutions: React.FC = () => {

    return (
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Solutions"></Heading>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Solutions;