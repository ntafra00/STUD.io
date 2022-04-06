import React from "react"
import {Divider, Drawer as MuiDrawer} from "@mui/material"
import { makeStyles } from "@mui/styles"
import ProfessorList from "./ProfessorList"
import StudentList from "./StudentList"
import UserInfo from "./UserInfo"

const useStyles: Function = makeStyles((theme: any) => {
    return {
        drawer: {
            width: "350px"
        },
        drawerPaper : {
            width: "350px"
        },
}})

const user: string = "professor" 

const Drawer: React.FC = () => {
    
    const classes = useStyles()

    return(
        <MuiDrawer className={classes.drawer} anchor="left" variant="permanent" classes={{paper: classes.drawerPaper}}>
            <UserInfo></UserInfo>
            <Divider style={{marginBottom: "10px", marginTop: "20px"}}></Divider>
            {user === "professor" ?
            <ProfessorList></ProfessorList>
            :
            <StudentList></StudentList>}
        </MuiDrawer>
    )
}

export default Drawer