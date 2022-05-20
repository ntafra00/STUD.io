import React from "react"
import Drawer from "../../components/Drawer/Drawer";
import { StyledContainer, ContentWrapper } from "../../index.styled";
import Heading from "../../components/Heading";
import { ChartContainer } from "./index.styled";
import Chart from "./Chart";

const Progress: React.FC = () => {
    return(
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Progress"></Heading>
                <ChartContainer>
                    <Chart/>
                </ChartContainer>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Progress;
