import React from "react"
import {Button, Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material"
import TaskForm from "../Forms/taskForm"

interface IProps {
    dialogState: boolean,
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const AddTaskDialog: React.FC<IProps> = ({dialogState, setDialogState}) => {
    return (
        <div>
            <Dialog open={dialogState}>
                <DialogTitle>Add task</DialogTitle>
                <DialogContent>
                <DialogContentText>
                    To add task please enter task name and it's expiration date.
                </DialogContentText>
                <TaskForm dialogState={dialogState} setDialogState={setDialogState}></TaskForm>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default AddTaskDialog;