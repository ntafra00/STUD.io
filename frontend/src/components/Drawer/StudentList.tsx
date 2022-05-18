import React from "react"
import AssignmentIcon from '@mui/icons-material/Assignment';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { SsidChartRounded } from "@mui/icons-material";
import {List, ListItem, ListItemIcon, ListItemText, IconButton} from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import API from "../../utils/api/api";

const StudentList: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const listItems = [
        {
            text: "Dashboard",
            icon: <DashboardIcon color="primary" fontSize="large"></DashboardIcon>,
            path: "/dashboard"
        },
        {
            text: "Solutions",
            icon: <EmojiObjectsIcon color="primary" fontSize="large"></EmojiObjectsIcon>,
            path: "/solutions"
        },
        {
            text: "Progress",
            icon: <SsidChartRounded color="primary" fontSize="large"></SsidChartRounded>,
            path: "/progress"
        },
        {
            text: "Tasks",
            icon: <AssignmentIcon color="primary" fontSize="large"></AssignmentIcon>,
            path: "/tasks"
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
                    onClick={() => {handleClick(item)}}
                    key={item.text} 
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

export default StudentList;