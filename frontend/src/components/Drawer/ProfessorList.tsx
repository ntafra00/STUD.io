import React from "react"
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TaskIcon from '@mui/icons-material/Task';
import {List, ListItem, ListItemIcon, ListItemText, IconButton} from "@mui/material"
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
            text: "Tasks",
            icon: <TaskIcon color="primary" fontSize="large"></TaskIcon>,
            path: "/tasks"
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
                window.location.href = "http://localhost:3000"
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
                    style={location.pathname === item.path ? {backgroundColor: "#DBE4EE"}: {backgroundColor: "white"}}
                    >
                        <ListItemIcon><IconButton>{item.icon}</IconButton></ListItemIcon>
                        <ListItemText primary={item.text}/>
                    </ListItem>
                )
            })}
        </List>
    )
}

export default ProfessorList;