
export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const EDIT_TOY = 'EDIT_TOY'
export const SET_FILTER = 'SET_FILTER'
export const UNDO_CHANGES = 'UNDO_CHANGES'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: null,
    filterBy: {},
    isLoading: true,
    lastToys: []
}

export function toyReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_TOYS:
            return {
                ...state,
                toys: cmd.toys
            }
        case REMOVE_TOY:
            return {
                ...state,
                toys: state.toys.filter(toy => toy.id !== cmd.toyId),
                lastToys: [...state.toys]
            }
        case ADD_TOY:
            return {
                ...state,
                toys: [...state.toys, cmd.toy]
            }
        case EDIT_TOY:
            return {
                ...state,
                toys: state.toys.map(toy => toy.id === cmd.toy.id ? cmd.toy : toy),
            }

        case SET_FILTER:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.filterBy }
            }
        case UNDO_CHANGES:
            console.log('UNDO');
            return {
                ...state,
                toys: [...state.lastToys]
            }
        case SET_IS_LOADING:

            return {
                ...state,
                isLoading: cmd.isLoading
            }
        default:
            return state
    }
}