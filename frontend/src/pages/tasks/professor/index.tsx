import React, {useState} from "react"
import TaskForm from "../../../components/Forms/taskForm";
import AddTaskDialog from "../../../components/Dialogs/AddTaskDialog";

const ProfessorTasks = () => {

    const [dialogState, setDialogState] = useState<boolean>(false);


    return (
        <>
            <h1>Hello professor</h1>
            <AddTaskDialog dialogState={dialogState} setDialogState={setDialogState}/>
            <button onClick={() => {setDialogState(!dialogState)}}>Click me</button>
        </>
    )

}

export default ProfessorTasks;