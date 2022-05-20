import React, {createContext, useState} from "react"
import API from "../../utils/api/api"
import Task from "../../models/task"

interface ITaskContext {
    state: {
        tasks: Task[] | null
    } | null
    actions: {
        getTasks: Function;
    } | null
}

interface IProviderProps {
    children: React.ReactNode;
}

export const TaskContext = createContext<ITaskContext>({
    state: null,
    actions: null
})

const initialValue = {
    tasks: []
}

const TaskProvider: React.FC<IProviderProps> = ({children}) => {
    const [state, setState] = useState(initialValue);

    const getTasks = async () => {
        try {
            let response = await API.get("/task/?id=1")
            if(response.status === 200)
            {
                setState({...state, tasks: [...state.tasks, ...response.data.data]})
            }
        } catch (error) {
            return error;
        }
    }

    return (
        <TaskContext.Provider value={{state: state, actions: {getTasks}}}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider;