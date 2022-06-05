import React, {useContext} from "react"
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import {Link} from "react-router-dom"
import {FancyLink} from "./index.styled"
import { DashboardContext } from "../../context/contexts/dashboardContext";
import Solution from "../../models/solution";
import Task from "../../models/task";

interface IProps {
    index: number;
    id: number;
}

const StudentSuccess: React.FC<IProps> = ({index, id}) => {

    const {state, actions} = useContext(DashboardContext)

    const handleClick = (id: number) => {
        actions.removeFromDashboard(id)
    }

    return (
        <Alert severity="success" key={index}>
            <AlertTitle>Success</AlertTitle>
            <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                <div>Mario reviewed your solution - <strong><Link to="/solutions">check it out at solutions section!</Link></strong></div>
                <FancyLink onClick={() => {handleClick(id)}}><strong>MARK IT AS READ</strong></FancyLink>
            </div>
        </Alert>
    )
}

export default StudentSuccess;