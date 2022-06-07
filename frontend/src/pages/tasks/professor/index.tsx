import React, {useState} from "react"
import AddTaskDialog from "../../../components/Dialogs/AddTaskDialog";
import { TestWrapper } from "../../reports/index.styled";
import TaskTable from "./TaskTable"
import AddButton from "./AddButton";

const ProfessorTasks: React.FC = () => {

    const [dialogState, setDialogState] = useState<boolean>(false);

    return (
        <>  
            <TestWrapper>
                <AddButton dialogState={dialogState} setDialogState={setDialogState}/>
                <TaskTable dialogState={dialogState} setDialogState={setDialogState}/>
            </TestWrapper>
            <AddTaskDialog dialogState={dialogState} setDialogState={setDialogState}/>
        </>
    )

}

export default ProfessorTasks;