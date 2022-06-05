import React, {useContext, useEffect, useState} from "react"
import Drawer from "../../components/Drawer/Drawer";
import { StyledContainer, ContentWrapper } from "../../index.styled";
import Heading from "../../components/Heading";
import { ChartContainer } from "./index.styled";
import Chart from "./Chart";
import Notification from "./Notification";
import { SolutionContext } from "../../context/contexts/solutionContext";
import { UserContext } from "../../context/contexts/userContext";
 
const Progress: React.FC = () => {

    const {state,actions} = useContext(SolutionContext);
    const {user} = useContext(UserContext)

    useEffect(() => {
      const getData = async () => {
        let error = await actions.getMarkedSolutions();
      }
      if(state.markedSolutions.length === 0)
          getData();
    }, [user])
    
    return(
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Progress"></Heading>
                {state.markedSolutions.length !== 0 ? <ChartContainer><Chart chartData={state.markedSolutions}/></ChartContainer> : <Notification/>}
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Progress;
