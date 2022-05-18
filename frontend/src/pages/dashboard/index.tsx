import React from "react"
import {StyledContainer, ContentWrapper} from "../../index.styled"
import Drawer from "../../components/Drawer/Drawer"
import DashBoardContent from "./DashBoardContent"
import Heading from "../../components/Heading"

const Dashboard: React.FC = () => {
    return (
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Dashboard"></Heading>
                <DashBoardContent></DashBoardContent>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Dashboard;