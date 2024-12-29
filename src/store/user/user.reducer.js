
import { userService } from "../../services/user.serivce"

export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'

export const UNDO_CHANGES = 'UNDO_CHANGES'

const initialState = {
    user: userService.getLoggedinUser(),
    users: []
}


export function userReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_USER:
            return { ...state, user: cmd.user }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== cmd.userId)
           }
        case SET_USERS:
            return { ...state, users: cmd.users }
    
        case UNDO_CHANGES:
            console.log('UNDO');
            return {
                ...state,
                toys: [...state.lastToys]
            }

        default:
            return state
    }
}