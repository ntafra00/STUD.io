import React, {useContext, useEffect, useState} from "react"
import {Divider, Drawer as MuiDrawer} from "@mui/material"
import { makeStyles } from "@mui/styles"
import ProfessorList from "./ProfessorList"
import StudentList from "./StudentList"
import UserInfo from "./UserInfo"
import { UserContext } from "../../context/contexts/userContext"
import EditInfoDialog from "../Dialogs/EditInfoDialog"

const useStyles: Function = makeStyles((theme: any) => {
    return {
        drawer: {
            width: "300px"
        },
        drawerPaper : {
            width: "300px"
        },
}})

const Drawer: React.FC = () => {

    const classes = useStyles()
    const [dialogState, setDialogState] = useState(false);
    const {user, actions} = useContext(UserContext);

    useEffect(() => {
        const checkForUser = async () => {
            if(user === null)
            {
                actions.getUser();
            }
        }
        checkForUser();
    }, [])

    return(
        <MuiDrawer className={classes.drawer} anchor="left" variant="permanent" classes={{paper: classes.drawerPaper}}>
            <UserInfo dialogState={dialogState} setDialogState={setDialogState}></UserInfo>
            <Divider style={{marginBottom: "10px", marginTop: "20px"}}></Divider>
            {user?.role === "professor" ?
            <ProfessorList></ProfessorList>
            :
            <StudentList></StudentList>}
            <EditInfoDialog dialogState={dialogState} setDialogState={setDialogState}/>
        </MuiDrawer>
    )
}

export default Drawer