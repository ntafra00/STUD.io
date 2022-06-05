import React from 'react';
import {Dialog, DialogContent, DialogContentText, DialogTitle} from "@mui/material"
import SolutionForm from '../Forms/solutionForm';

interface IProps {
    dialogState: boolean,
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const MarkSolutionDialog: React.FC<IProps> = ({dialogState, setDialogState}) => {
    return (
        <div>
            <Dialog open={dialogState}>
                <DialogTitle>Mark solution</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This is a place where you can give your opinion about read file.
                    </DialogContentText>
                    <SolutionForm setDialogState={setDialogState}/>
                </DialogContent>
      </Dialog>
    </div>
    )   
} 

export default MarkSolutionDialog;