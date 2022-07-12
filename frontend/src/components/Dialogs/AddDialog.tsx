import React, {useContext} from 'react';
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material"
import StudentForm from '../Forms/studentForm';
import {StudentsContext} from "../../context/contexts/studentContext"

interface IProps {
  dialogState: boolean,
  setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const AddDialog: React.FC<IProps> = ({dialogState, setDialogState}) => {

  const {state, actions} = useContext(StudentsContext);

  return (
    <div>
      <Dialog open={dialogState}>
        <DialogTitle>{state.selectedStudent ? "Edit student" : "Add student"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {!state.selectedStudent ? 
            `To add student please enter his email address and full name.    
            Password will be generated using this pattern: John Doe = johdoe22` 
            : 
            `Use this dialog if you want to change student's email address or full name`}
          </DialogContentText>
          <StudentForm dialogState={dialogState} setDialogState={setDialogState}></StudentForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddDialog;