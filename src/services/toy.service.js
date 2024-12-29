import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    query,
    save,
    remove,
    getById,
    createToy,
}

const STORAGE_KEY = 'toys'

_createToys()

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
    .then(toys => {
        let filteredToys = toys; // Create a new variable
    
        if (filterBy.name) {
            const regExp = new RegExp(filterBy.name, 'i');
            filteredToys = filteredToys.filter(toy => regExp.test(toy.name));
        }
    
        if (filterBy.importance) {
            filteredToys = filteredToys.filter(toy => toy.price >= filterBy.price);
        }
    
        if (filterBy.inStock !== 'all') {
            filteredToys = filteredToys.filter(toy => 
                filterBy.inStock === 'done' ? toy.inStock : !toy.inStock
            );
        }
    
        if (filterBy.sort) {
            if (filterBy.sort === 'name') {
                filteredToys = filteredToys.sort((a, b) => a.name.localeCompare(b.name));
            } else if (filterBy.sort === 'createdAt') {
                filteredToys = filteredToys.sort((a, b) => a.createdAt - b.createdAt);
            }
        }
    
        return filteredToys; 
    });
    
}




function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(toyToSave) {
    if (toyToSave.id) {
        return storageService.put(STORAGE_KEY, toyToSave)
    } else {
        toyToSave.isOn = false
        return storageService.post(STORAGE_KEY, toyToSave)
    }
}

function createToy(name = '', price = 100, label , inStock = true) {
    return {
        name,
        price,
        label: [],
        inStock,
        createdAt: Date.now(),
    }
}

/*function getDefaultFilter() {
    return {
        type: '',
        minBatteryStatus: 0,
        model: ''
    }
}*/

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            { id: 'r1', name: 'Tolly', price: 105, labels: ['Doll', 'Battery Powered', 'Baby'], createdAt: Date.now() ,inStock: true},
            { id: 'r2', name: 'Tolly', price: 105, labels: ['Art', 'Battery Powered', 'Outdoor'], createdAt: Date.now() ,inStock: true},
            { id: 'r3', name: 'Tolly', price: 105, labels: ['Doll', 'Puzzle', 'Baby'], createdAt: Date.now() ,inStock: false,},
            { id: 'r4', name: 'Tolly', price: 105, labels: ['Puzzle', 'Battery Powered', 'Art'], createdAt: Date.now() ,inStock: true},
            { id: 'r4', name: 'Tolly', price: 105, labels: ['Box game', 'Puzzle', 'Art'], createdAt: Date.now() ,inStock: true,}
           ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}




