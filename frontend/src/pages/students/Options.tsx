import React, {useState} from "react"
import {StyledDiv} from "./index.styled"
import { Button } from "@mui/material"


interface IProps {
    dialogState: boolean,
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
  }

const Options: React.FC<IProps> = ({dialogState, setDialogState}) => {

    return (
        <>
            <StyledDiv>
                <Button variant="outlined" onClick={() => setTimeout(() => setDialogState(true), 500)}>Add student</Button>
            </StyledDiv>
            
        </>
    )
}

export default Options;