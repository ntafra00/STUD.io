import React from 'react';
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material"
import FileForm from '../Forms/fileForm';

interface IProps {
  dialogState: boolean,
  setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const AddSolutionDialog: React.FC<IProps> = ({dialogState, setDialogState}) => {
  return (
    <div>
      <Dialog open={dialogState}>
        <DialogTitle>Upload solution</DialogTitle>
        <DialogContent>
          <DialogContentText>
          </DialogContentText>
          <FileForm dialogState={dialogState} setDialogState={setDialogState}></FileForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddSolutionDialog;