import React, {useState} from "react"
import {StyledDiv} from "./index.styled"
import { Button } from "@mui/material"


interface IProps {
    dialogState: boolean,
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
  }

const AddButton: React.FC<IProps> = ({dialogState, setDialogState}) => {

    return (
        <>
            <StyledDiv>
                <Button variant="outlined" onClick={() => setDialogState(true)}>Add task</Button>
            </StyledDiv>
            
        </>
    )
}

export default AddButton;