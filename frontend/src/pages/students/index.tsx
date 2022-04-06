import React from "react"
import Drawer from "../../components/Drawer/Drawer";
import Heading from "../../components/Heading";
import StudentTable from "./StudentTable"
import { ContentWrapper, StyledContainer } from "../../index.styled";
import Options from "./Options";
import AddDialog from "./AddDialog";

const Students: React.FC = () => {
    return (
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Students"/>
                <Options></Options>
                <AddDialog></AddDialog>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Students;