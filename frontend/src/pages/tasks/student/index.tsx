import React, {useState} from "react"
import { TasksContainer } from "./index.styled";
import TaskList from "./TaskList";
import AddSolutionDialog from "../../../components/Dialogs/AddSolutionDialog";

const StudentTasks: React.FC = () => {

    const [dialogState, setDialogState] = useState<boolean>(false);

    return (
        <>
            <TasksContainer>
                <TaskList  dialogState={dialogState} setDialogState={setDialogState}/>
            </TasksContainer>
            <AddSolutionDialog dialogState={dialogState} setDialogState={setDialogState}/>
        </>
    )
}

export default StudentTasks;