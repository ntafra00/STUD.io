import React, {useContext, useEffect} from "react"
import {Divider, Drawer as MuiDrawer} from "@mui/material"
import { makeStyles } from "@mui/styles"
import ProfessorList from "./ProfessorList"
import StudentList from "./StudentList"
import UserInfo from "./UserInfo"
import { UserContext } from "../../context/contexts/userContext"
import API from "../../utils/api/api";


const useStyles: Function = makeStyles((theme: any) => {
    return {
        drawer: {
            width: "350px"
        },
        drawerPaper : {
            width: "350px"
        },
}})

const Drawer: React.FC = () => {

    const classes = useStyles()
    const {user, actions} = useContext(UserContext);

    useEffect(() => {
        const getLoggedUser = async () => {
            try {
                let response = await API.get("/auth");
                if(response.status === 200)
                {
                    console.log(response.data.data);
                    actions?.getUser(response.data.data);
                }
                    
            } catch (error) {
                console.log(error);
                return;
            }   
        }
        if(user === null)
            getLoggedUser();
    }, [])

    return(
        <MuiDrawer className={classes.drawer} anchor="left" variant="permanent" classes={{paper: classes.drawerPaper}}>
            <UserInfo></UserInfo>
            <Divider style={{marginBottom: "10px", marginTop: "20px"}}></Divider>
            {user?.role === "professor" ?
            <ProfessorList></ProfessorList>
            :
            <StudentList></StudentList>}
        </MuiDrawer>
    )
}

export default Drawer