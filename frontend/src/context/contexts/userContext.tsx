import React, {createContext, ReactChild, useReducer} from "react"
import User from "../../models/user";
import {userReducer} from "../reducers/userReducer"
import API from "../../utils/api/api"
import { REMOVE_USER, SET_USER } from "../actions/userActions";

interface IUserContext {
    state: {
        user: User;
    } | null
    actions: {
        setUser: Function;
        removeUser: Function;
    } | null
    dispatch: Function
}

const initialState = {
    user: null,
}

interface IProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext<IUserContext>({
    state: null,
    actions: null,
    dispatch: () => null,
})


const UserProvider = (children: IProviderProps) => {
    const [state, dispatch] = useReducer(userReducer, initialState)

    const setUser = async () => {
        const response = await API.get("/auth");
        console.log(response.data);
        dispatch({type: SET_USER, payload: response.data})
    }

    const removeUser = () => {
        dispatch({type: REMOVE_USER})
    }

    return (
        <UserContext.Provider value={{state, dispatch, actions: {setUser, removeUser}}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
