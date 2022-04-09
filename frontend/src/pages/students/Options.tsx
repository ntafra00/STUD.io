import React, {useState} from "react"
import {StyledDiv} from "./index.styled"
import { Select, Typography, Button } from "@mui/material"
import { Box } from "@mui/system"


interface IProps {
    dialogState: boolean,
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
  }

const Options: React.FC<IProps> = ({dialogState, setDialogState}) => {

    

    return (
        <>
            <StyledDiv>
                <Button variant="outlined" onClick={() => {setDialogState(true)}}>Add student</Button>
            </StyledDiv>
            
        </>
    )
}

export default Options;