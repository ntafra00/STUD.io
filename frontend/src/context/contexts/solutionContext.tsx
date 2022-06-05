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
                console.log(response.data.data);
                setState({...state, markedSolutions: [...response.data.data]})
            }
        } catch (error) {
            return error;   
        }
    }

    return (
        <SolutionContext.Provider value={{state: state, actions: {getSolutions, deleteSolution, getMarkedSolutions} }}>
            {children}
        </SolutionContext.Provider>
    )
}

export default SolutionsProvider;
