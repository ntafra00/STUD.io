import React, {createContext, useState} from "react"
import UserInfo from "../../inputs/userInfo";
import User from "../../models/user";
import API from "../../utils/api/api"

interface IUserContext {
    user: User | null
    actions: {
        removeUser: Function;
        setUser: Function;
        getUser: Function;
        editUser: Function;
    } | null
}

interface IProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext<IUserContext>({
    user: null,
    actions: null,
})


const UserProvider: React.FC<IProviderProps> = ({children}) => {
    const [state, setState] = useState(null);

    const getUser = async () => {
        try {
            let response = await API.get("/auth");
            if(response.status === 200)
            {
                setState({...response.data.data});
            }  
        } catch (error) {
            console.log(error);
        }
    }

    const setUser = (userData: User) => {
        setState({...userData})
    }

    const removeUser = () => {
        const removeUser = {user: null}
        setState(null)
    }

    const editUser = async (newPassword: string) => {
        try {
            let response = await API.put("/auth", {
                password: newPassword
            })
            if(response.status === 200)
            {
                let loggedOut = await API.get("/auth/logout");
                if(loggedOut.status === 200)
                    window.location.href = "http://localhost:3000"
            }
        } catch (error) {
            return error;
        }
    }

    return (
        <UserContext.Provider value={{user: state, actions: {getUser, removeUser, setUser, editUser}}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
