import React, {createContext, useState} from "react"
import API from "../../utils/api/api"
import Solution from "../../models/solution"
import MarkedSolution from "../../models/markedSolution";

interface ISolutionContext {
    state: {
        solutions: Solution[] | null;
        selectedSolution: Solution  | null;
        markedSolutions: MarkedSolution[] | null;
    } | null
    actions: {
        getSolutions: Function;
        deleteSolution: Function;
        getMarkedSolutions: Function;
        uploadSolution: Function;
    } | null
}

interface IProviderProps {
    children: React.ReactNode
}

export const SolutionContext = createContext<ISolutionContext>({
    state: null,
    actions: null,
})

const initialValue = {
    solutions: [],
    selectedSolution: null,
    markedSolutions: []
}

const SolutionsProvider: React.FC<IProviderProps> = ({children}) => {
    const [state, setState] = useState(initialValue);

    const getSolutions = async () => {
        try {
            let response = await API.get("/solution");
            if(response.status === 200)
            {
                setState({...state, solutions: [...response.data.data]})
            }
        } catch (error) {
            console.log(error);
            return error;   
        }
    }

    const deleteSolution = async (solutionId: number) => {
        try {
            let response = await API.delete(`/solution/?id=${solutionId}`)
            if(response.status === 200)
            {
                let filteredSolutions = state.solutions.filter((solution) => solution.id !== solutionId);
                setState({...state, solutions: filteredSolutions})
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getMarkedSolutions = async () => {
        try {
            let response = await API.get("/solution/progress")
            if(response.status === 200)
            {
                setState({...state, markedSolutions: [...response.data.data]})
            }
        } catch (error) {
            return error;   
        }
    }

    const uploadSolution = async (file, taskId: number) => {
        
        const solutionData = new FormData()
        solutionData.append("file", file);
        solutionData.append("mark", "Not given");
        solutionData.append("description", "Not given");
        solutionData.append("taskId", String(taskId));
        solutionData.append("checked", "false");
        try {
            let response = await API.post("/solution", solutionData)
            console.log(response);
            if(response.status === 200)
            {
                setState({...state, solutions: [...state.solutions, response.data.data]})
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    return (
        <SolutionContext.Provider value={{state: state, actions: {getSolutions, deleteSolution, getMarkedSolutions, uploadSolution} }}>
            {children}
        </SolutionContext.Provider>
    )
}

export default SolutionsProvider;
