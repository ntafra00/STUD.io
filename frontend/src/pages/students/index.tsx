import React, {useEffect, useState} from "react"
import Drawer from "../../components/Drawer/Drawer";
import Heading from "../../components/Heading";
import StudentTable from "./StudentTable"
import { ContentWrapper, StyledContainer } from "../../index.styled";
import AddDialog from "../../components/Dialogs/AddDialog";
import Student from "../../models/student";
import API from "../../utils/api/api";
import Options from "./Options";
import { StyledDiv } from "./index.styled";

const Students: React.FC = () => {

    const [dialogState, setDialogState] = useState<boolean>(false);
    const [students, setStudents] = useState<Student[]>([]);

    const removeStudent = (id: number) => {
        setStudents(students.filter((student) => student.id !== id))
    }

    useEffect(() => {
        const getStudents = async () => {
            try {
                let response = await API.get("/student")
                if(response.status === 200)
                    setStudents(response.data.data);
            } catch (error) {
                console.log(error);
                return;
            }
        }
        getStudents();
    }, [])


    return (
        <StyledContainer>
            <Drawer></Drawer>
            <ContentWrapper>
                <Heading text="Students"/>
                <Options dialogState={dialogState} setDialogState={setDialogState}></Options>
                <StudentTable students={students} removeStudent={removeStudent}></StudentTable>
                <AddDialog dialogState={dialogState} setDialogState={setDialogState}></AddDialog>
            </ContentWrapper>
        </StyledContainer>
    )
}

export default Students;