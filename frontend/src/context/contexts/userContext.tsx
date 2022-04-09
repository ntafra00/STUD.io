import React, {createContext, useState} from "react"
import User from "../../models/user";
import API from "../../utils/api/api"

interface IUserContext {
    user: User | null
    actions: {
        removeUser: Function;
        getUser: Function;
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
            return;
        }
    }

    const removeUser = () => {
        const removeUser = {user: null}
        setState(null)
    }
    

    return (
        <UserContext.Provider value={{user: state, actions: {getUser, removeUser}}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;
