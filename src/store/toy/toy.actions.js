import { toyService } from "../../services/toy.service"
import { store } from "../store";
import { REMOVE_TOY ,EDIT_TOY, ADD_TOY, SET_TOYS, SET_FILTER} from "./toy.reducer";
import { showErrorMsg } from "../../services/event-bus.service";




export async function loadToys() {

    try {
        const filterBy = store.getState().toyModule.filterBy

        const toys = await toyService.query(filterBy)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('Having issues with loading toys:', err)
        showErrorMsg('Having issues with loading toys:')
        throw err
    }
}
export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.log('Having issues removing toy:', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
}

export async function saveToy(toyToSave) {
    try {
        const type = toyToSave.id ? EDIT_TOY : ADD_TOY
        const toy = await toyService.save(toyToSave)
        store.dispatch({ type, toy })
    } catch (err) {
        console.log('Having issues saving toy:', err)
        throw err
    }
}