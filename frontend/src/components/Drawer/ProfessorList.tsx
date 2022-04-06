import React from "react"
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SchoolIcon from '@mui/icons-material/School';
import DashboardIcon from '@mui/icons-material/Dashboard';
import {List, ListItem, ListItemIcon, ListItemText} from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import API from "../../utils/api/api";

const ProfessorList: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const listItems = [
        {
            text: "Dashboard",
            icon: <DashboardIcon color="primary" fontSize="large"></DashboardIcon>,
            path: "/dashboard"
        },
        {
            text: "Courses",
            icon: <SchoolIcon color="primary" fontSize="large"></SchoolIcon>,
            path: "/courses"
        },
        {
            text: "Reports",
            icon: <AssignmentIcon color="primary" fontSize="large"></AssignmentIcon>,
            path: "/reports"
        },
        {
            text: "Students",
            icon: <PersonIcon color="primary" fontSize="large"></PersonIcon>,
            path: "/students"
        },
        {
            text: "Log out",
            icon: <LogoutIcon color="primary" fontSize="large"></LogoutIcon>
        }
    ]

    const handleLogout = async () => {
        try {
            let response = await API.get("/auth/logout");
            if(response.status === 200)
                navigate("");
        } catch (error) {
            return;
        }
    }

    const handleClick = (item) => {
        if(item.path)
            navigate(item.path)
        else
            handleLogout();
    }

    return (
        <List>
            {listItems.map((item) => {
                return (
                    <ListItem  
                    button
                    key={item.text} 
                    onClick={() => {handleClick(item)}}
                    style={location.pathname === item.path ? {backgroundColor: "#f4f4f4"}: {backgroundColor: "white"}}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text}/>
                    </ListItem>
                )
            })}
        </List>
    )
}

export default ProfessorList;