import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material"
import StudentForm from '../../components/Forms/studentForm';

const AddDialog: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add student please enter his email address, full name and password.
            Password will be generated using generate password button.
          </DialogContentText>
          <StudentForm handleClickOpen={handleClickOpen} handleClickClose={handleClose}></StudentForm>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddDialog;