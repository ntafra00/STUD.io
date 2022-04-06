import React from "react"
import {Avatar, IconButton} from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import { Box} from "@mui/system"

const UserInfo: React.FC = () => {

    return (
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px", marginLeft: "15px"}}>
            <Avatar sx={{bgcolor: "#1976d2", marginRight: "5px"}}>NT</Avatar>
            <IconButton style={{marginRight: "10px"}}><SettingsIcon></SettingsIcon></IconButton>
        </Box>
    )
}

export default UserInfo