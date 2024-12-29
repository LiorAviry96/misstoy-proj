import { toyService } from "../../services/toy.service"
import { store } from "../store";
import { REMOVE_TOY , SET_TOYS, SET_FILTER} from "./toy.reducer";
import { showErrorMsg } from "../../services/event-bus.service";




export async function loadToys() {

    try {
        const filterBy = store.getState().toyModule.filterBy
        console.log('action', filterBy)

        const toys = await toyService.query(filterBy)
        console.log('action', toys)
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