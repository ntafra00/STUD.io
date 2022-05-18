import React, { useContext, useEffect } from "react"
import { ContentContainer } from "./index.styled"
import Info from "./Info"
import ImageContainer from "./ImageContainer"
import { UserContext } from "../../context/contexts/userContext"
import { DashboardContext } from "../../context/contexts/dashboardContext"

const DashBoardContent: React.FC = () => {
    
    const {user} = useContext(UserContext)
    const {state, actions} = useContext(DashboardContext)

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
        <ContentContainer>
             <Info></Info>
             <ImageContainer></ImageContainer>
        </ContentContainer>
    )
}

export default DashBoardContent