import React from 'react';
import {Button, Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material"
import StudentForm from '../Forms/studentForm';
import UserForm from '../Forms/userForm';

interface IProps {
  dialogState: boolean,
  setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const EditInfoDialog: React.FC<IProps> = ({dialogState, setDialogState}) => {
  return (
    <div>
      <Dialog open={dialogState}>
        <DialogTitle>Edit data</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You'll be automatically logged out after submitting new password.
          </DialogContentText>
          <UserForm dialogState={dialogState} setDialogState={setDialogState}/>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditInfoDialog;