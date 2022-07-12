import React, { useContext, useEffect } from "react"
import Heading from "../../components/Heading";
import { StyledContainer, ContentWrapper } from "../../index.styled"
import Drawer from "../../components/Drawer/Drawer";
import { SolutionContext } from "../../context/contexts/solutionContext";
import { UserContext } from "../../context/contexts/userContext";
import SolutionList from "./SolutionList";

const Solutions: React.FC = () => {

    const {state, actions} = useContext(SolutionContext)
    const {user} = useContext(UserContext)

    useEffect(() => {
        if(state.solutions.length === 0)
            actions.getSolutions();
    }, [user])

    return (
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Solutions"></Heading>
                <SolutionList/>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Solutions;