import React from "react"
import {StyledContainer, ContentWrapper} from "../../index.styled"
import Drawer from "../../components/Drawer/Drawer"
import DashBoardContent from "./DashBoardContent"

const Dashboard: React.FC = () => {
    return (
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <DashBoardContent></DashBoardContent>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Dashboard;