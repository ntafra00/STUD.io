import React, {useEffect, useContext, useState} from "react"
import Drawer from "../../components/Drawer/Drawer";
import Heading from "../../components/Heading";
import StudentTable from "./StudentTable"
import { ContentWrapper, StyledContainer } from "../../index.styled";
import AddDialog from "../../components/Dialogs/AddDialog";
import Options from "./Options";
import { StudentsContext } from "../../context/contexts/studentContext";

const Students: React.FC = () => {

    const [dialogState, setDialogState] = useState<boolean>(false);
    const {state, actions} = useContext(StudentsContext)
    
    useEffect(() => {    
        if(state.students.length === 0)
        {
            actions.getStudents();
        }
    }, []);
    
    return (
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Students"/>
                <Options dialogState={dialogState} setDialogState={setDialogState}></Options>
                <StudentTable dialogState={dialogState} setDialogState={setDialogState}></StudentTable>
                <AddDialog dialogState={dialogState} setDialogState={setDialogState}></AddDialog>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Students;