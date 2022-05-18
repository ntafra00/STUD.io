import React from "react"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {Link} from "react-router-dom"

interface IProps {
    index: number;
}

const StudentSuccess: React.FC<IProps> = ({index}) => {
    return (
        <Alert severity="success" key={index}>
            <AlertTitle>Success</AlertTitle>
            Mario reviewed your solution - <strong><Link to="/solutions">check it out at solutions section!</Link></strong>
        </Alert>
    )
}

export default StudentSuccess;