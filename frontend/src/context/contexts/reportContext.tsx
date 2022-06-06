import React, {createContext, useState} from "react"
import API from "../../utils/api/api"
import Report from "../../models/report";
import Task from "../../models/task"

interface IReportsContext {
    state: {
        reports: Report[] | null;
        selectedReport:  Report | null;
        filteredReports: Report[] | null;
        tasks: Task[] | null;
    } | null
    actions: {
        getReports: Function;
        setSelectedReport: Function;
        removeSelectedReport: Function;
        postReview: Function;
        filterReports: Function;
    } | null
}

interface IProviderProps {
    children: React.ReactNode
}

export const ReportsContext = createContext<IReportsContext>({
    state: null,
    actions: null,
})

const initialValue = {
    reports: [],
    selectedReport: null,
    filteredReports: null,
    tasks: []
}

const ReportsProvider: React.FC<IProviderProps> = ({children}) => {
    const [state, setState] = useState(initialValue);
    
    const getReports = async () => {
        try {
            let response = await API.get("/solution");
            if(response.status === 200)
            {
                setState({...state, reports: [...response.data.data.professorSolutions], filteredReports: [...response.data.data.professorSolutions], tasks: [...response.data.data.tasks]})
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const setSelectedReport = (id: number) => {
        let reportToBeSelected = state.reports.find((report) => report.id === id);
        setState({...state, selectedReport: reportToBeSelected})
    }

    const removeSelectedReport = () => {
        setState({...state, selectedReport: null});
    }

    const postReview = async (reviewData) => {
        try {
            let response = await API.put("/solution", {
                id: reviewData.id,
                mark: reviewData.mark,
                description: reviewData.description
            })
            if(response.status === 200)
            {
                let filterAllReports = state.reports.filter((report) => report.id !== reviewData.id);
                let filterSelectedReports = state.filteredReports.filter((report) => report.id !== reviewData.id)
                setState({...state, reports: filterAllReports, filteredReports: filterSelectedReports})
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const filterReports = (id: number) => {
        setState({...state, filteredReports: state.reports.filter((report) => report.task_id === id)})
    }
    return (
        <ReportsContext.Provider value={{state: state, actions: {getReports, setSelectedReport, removeSelectedReport, postReview, filterReports} }}>
            {children}
        </ReportsContext.Provider>
    )
}

export default ReportsProvider;
