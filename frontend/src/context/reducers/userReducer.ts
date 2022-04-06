import { SET_USER, REMOVE_USER } from "../actions/userActions"

export const userReducer = (state, action) => {
    switch(action.type){
        case SET_USER:
            return {...state, ...action.payload};
        case REMOVE_USER:
            return {...state, user: null}
        default:
            return {...state}    
    }
}