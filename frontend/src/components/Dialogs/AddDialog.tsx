import React from 'react';
import {Button, Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material"
import StudentForm from '../Forms/studentForm';

interface IProps {
  dialogState: boolean,
  setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const AddDialog: React.FC<IProps> = ({dialogState, setDialogState}) => {
  return (
    <div>
      <Dialog open={dialogState}>
        <DialogTitle>Add student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add student please enter his email address and full name.    
            Password will be generated using this pattern: John Doe = johdoe22
          </DialogContentText>
          <StudentForm dialogState={dialogState} setDialogState={setDialogState}></StudentForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddDialog;