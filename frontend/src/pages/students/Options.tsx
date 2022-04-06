import React from "react"
import {StyledDiv} from "./index.styled"
import { Select, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { IconButton } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';

const Options: React.FC = () => {
    return (
        <StyledDiv>
            <Box sx={{width: "400px", display: "flex", justifyContent: "space-between"}}>
                <Typography>Select course</Typography>
                <Select></Select>
            </Box>
            <IconButton>
                <AddIcon></AddIcon>
            </IconButton>
        </StyledDiv>
    )
}

export default Options;