import React, { useContext, useEffect } from "react"
import { ContentContainer } from "./index.styled"
import Info from "./Info"
import ImageContainer from "./ImageContainer"
import { UserContext } from "../../context/contexts/userContext"
import { DashboardContext } from "../../context/contexts/dashboardContext"
import {Typography} from "@mui/material"

const DashBoardContent: React.FC = () => {
    
    const {user} = useContext(UserContext)
    const {state, actions} = useContext(DashboardContext)
    let numberOfNotifications = state.news?.length - 5;

    useEffect(() => {
        const getNews = () => {
            if(user?.role === "student")
                actions.getStudentNews();
            else if(user?.role === "professor")
                actions.getProfessorNews();
        }

        if(state.news.length === 0)
            getNews();
    }, [user])
    
    return(
        <>
            <ContentContainer>
                <Info></Info>
                <ImageContainer></ImageContainer>
            </ContentContainer>
            <div style={{width: "100%", display: "flex", justifyContent: "beginning"}}>
                {state.news.length > 5 && <Typography style={{margin: "0 0 0 50px", color: "primary"}}>{numberOfNotifications > 1 ? `There are ${numberOfNotifications} more notifications` : "There is 1 more notification"}</Typography>}
            </div>
        </>
    )
}

export default DashBoardContent