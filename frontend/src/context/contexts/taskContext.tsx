import React, {createContext, useState} from "react"
import API from "../../utils/api/api"
import Task from "../../models/task"
import {Task as TaskInput} from "../../inputs/task"

interface ITaskContext {
    state: {
        tasks: Task[] | null,
        selectedTask: Task | null
    } | null
    actions: {
        getTasks: Function;
        setSelectedTask: Function;
        removeSelectedTask: Function;
        addNewTask: Function;
        updateTask: Function;
        deleteTask: Function;
        filterTasks: Function;
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
    tasks: [],
    selectedTask: null
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
    
    const setSelectedTask = (taskId: number) => {
        let selectedTask = state.tasks.find((task) => task.id === taskId);
        setState({...state, selectedTask: selectedTask})
    }

    const removeSelectedTask = () => {
        setState({...state, selectedTask: null})
    }

    const addNewTask = async (newTask: TaskInput) => {
        try {
            let response = await API.post("/task", {
                "name": newTask.name,
                "expirationDate": newTask.expirationDate,
                "courseId": 1
            })
            if(response.status === 200)
            {
                setState({...state, tasks: [...state.tasks, response.data.data]})
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const updateTask = async (updateData: Task) => {
        console.log(updateData);
        try {
            let response = await API.put(`/task/?id=${state.selectedTask.id}`, {
                "name": updateData.name,
                "expirationDate": updateData.expiration_date
            })
            if(response.status === 200)
            {
                let taskIndex = state.tasks.findIndex((task) => task.id === state.selectedTask.id)
                let updatedTasks = state.tasks;
                updatedTasks[taskIndex].name = updateData.name;
                updatedTasks[taskIndex].expirationDate = updateData.expiration_date;
                setState({...state, tasks: updatedTasks})
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const deleteTask = async (taskId: number) => {
        try {
            let response = await API.delete(`/task/?id=${taskId}`)
            if(response.status === 200)
            {
                setState({...state, tasks: state.tasks.filter((task) => task.id !== taskId)})
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    
    const filterTasks = (taskId: number) => {
        console.log("I am here")
        setState({...state, tasks: [state.tasks.filter((task) => task.id !== taskId)]})
    }

    return (
        <TaskContext.Provider value={{state: state, actions: {getTasks, setSelectedTask, removeSelectedTask, addNewTask, updateTask, deleteTask, filterTasks}}}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskProvider;