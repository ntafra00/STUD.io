import React, {useContext, useEffect} from "react"
import {Avatar, IconButton} from "@mui/material"
import SettingsIcon from '@mui/icons-material/Settings';
import { Box} from "@mui/system"
import { UserContext } from "../../context/contexts/userContext";
import CircularProgress from '@mui/material/CircularProgress';

interface IProps {
    dialogState: boolean,
    setDialogState: React.Dispatch<React.SetStateAction<boolean>>
}

const UserInfo: React.FC<IProps> = ({dialogState, setDialogState}) => {

    const {user,actions} = useContext(UserContext)

    const getUserInitials = (fullName: string) => {
        let userInitials = fullName.split(" ");
        return `${userInitials[0][0]}${userInitials[1][0]}`;
    } 

    return (
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "10px", marginLeft: "15px"}}>
            {user === null 
            ?
            <CircularProgress></CircularProgress>
            :
            <Avatar sx={{bgcolor: "#1976d2", marginRight: "5px"}}>{getUserInitials(user.fullName)}</Avatar>
            }
            <IconButton style={{marginRight: "10px"}} onClick={() => {setDialogState(true)}}><SettingsIcon fontSize="large"></SettingsIcon></IconButton>
        </Box>
    )
}

export default UserInfo