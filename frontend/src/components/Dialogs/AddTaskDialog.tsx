import React, {useContext} from "react"
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material"
import TaskForm from "../Forms/taskForm"
import {TaskContext} from "../../context/contexts/taskContext"

interface IProps {
    dialogState: boolean,
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTaskDialog: React.FC<IProps> = ({dialogState, setDialogState}) => {
    
    const {state, actions} = useContext(TaskContext);

    return (
        <div>
            <Dialog open={dialogState}>
                <DialogTitle>{state.selectedTask ? "Edit task" : "Add task"}</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    {state.selectedTask ? "Edit task by entering new name or expiration date" :"To add task please enter task name and it's expiration date."}
                </DialogContentText>
                <TaskForm dialogState={dialogState} setDialogState={setDialogState}></TaskForm>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddTaskDialog;