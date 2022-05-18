import React from "react"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {Link} from "react-router-dom"

interface IProps {
    index: number;
}

const ProfessorInfo: React.FC<IProps> = ({index}) => {
    return (
        <Alert severity="info">
            <AlertTitle key={index}>Info</AlertTitle>
            New report has been added - <strong><Link to="/reports">check it out at reports section</Link></strong> 
        </Alert>
    )
}

export default ProfessorInfo;