import React, {createContext, useState} from "react"
import API from "../../utils/api/api"
import Task from "../../models/task"
import Solution from "../../models/solution"

interface IDashboardContext {
    state: {
        news: (Task | Solution)[] | null
    } | null
    actions: {
        getStudentNews: Function;
        getProfessorNews: Function;
        removeFromDashboard: Function;
    } | null
}

interface IProviderProps {
    children: React.ReactNode;
}

export const DashboardContext = createContext<IDashboardContext>({
    state: null,
    actions: null
})

const initialValue = {
    news: []
}

const DashboardProvider: React.FC<IProviderProps> = ({children}) => {
    const [state, setState] = useState(initialValue);

    const getStudentNews = async () => {
        try {
            let response = await API.get("/dashboard");
            if(response.status === 200)
            {
                setState({...state, news:[...response.data.data.markedSolutions, ...response.data.data.unsolvedTasks]})
            }
        } catch (error) {   
            console.log(error);
        }
    }

    const getProfessorNews = async () => {
        try {
            let response = await API.get("/dashboard");
            if(response.status === 200)
            {
                setState({...state, news: [...response.data.data.addedSolutions]})
            }
        } catch (error) {
            console.log(error);
        }
    }

    const removeFromDashboard = async (id: number) => {
        try {
            let response = await API.put("/solution", {
                id: id
            })
            if(response.status === 200)
            {
                setState({...state, news: state.news.filter(element => {
                    if(!element.mark)
                        return element;
                    else if(element.id !== id)
                        return element; 
                })})
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <DashboardContext.Provider value = {{state: state, actions: {getStudentNews, getProfessorNews, removeFromDashboard}}}>
            {children}
        </DashboardContext.Provider>
    )
}

export default DashboardProvider;