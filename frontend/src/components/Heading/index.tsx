import React from "react"
import { StyledDiv } from "./index.styled"
import { Typography } from "@mui/material"

interface IProps{
    text: string;
}

const Heading: React.FC<IProps> = ({text}) => {
    return (
        <StyledDiv>
            <Typography variant="h3" color="primary">{text}</Typography>
        </StyledDiv>
    )
}

export default Heading