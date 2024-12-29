import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    query,
    save,
    remove,
    getById,
    createToy,
    getFilterFromSearchParams,
    getDefaultFilter,
}

const STORAGE_KEY = 'toys'

_createToys()

function query(filterBy = {}) {
    return storageService.query(STORAGE_KEY)
    .then(toys => {
        console.log('All toys from storage', toys);  // Check toys fetched from storage
        let filteredToys = toys; 
        
        if (filterBy.name) {
            const regExp = new RegExp(filterBy.name, 'i');
            filteredToys = filteredToys.filter(toy => regExp.test(toy.name));
        }
    
        if (filterBy.price) {
            filteredToys = filteredToys.filter(toy => toy.price >= filterBy.price);
        }
    
       if (filterBy.inStock !== "") {
            filteredToys = filteredToys.filter(toy =>
                filterBy.inStock ? toy.inStock : !toy.inStock
            );
        }
            if (filterBy.labels && filterBy.labels.length) {
                filteredToys = filteredToys.filter(toy =>
                    filterBy.labels.every(label => toy.labels.includes(label))
                );
            }
        if (filterBy.sort) {
            if (filterBy.sort === 'name') {
                filteredToys = filteredToys.sort((a, b) => a.name.localeCompare(b.name));
            } else if (filterBy.sort === 'createdAt') {
                filteredToys = filteredToys.sort((a, b) => a.createdAt - b.createdAt);
            }
        }
        
        console.log('Final filtered toys:', filteredToys);
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

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function getDefaultFilter() {
    return {
        name: '',
        price: 1000, // Example max price
        inStock: true,
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


function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            { id: 'r1', name: 'Tolly', price: 105, labels: ['Doll', 'Battery Powered', 'Baby'], createdAt: Date.now() ,inStock: true},
            { id: 'r2', name: 'Booly', price: 120, labels: ['Art', 'Battery Powered', 'Outdoor'], createdAt: Date.now() ,inStock: true},
            { id: 'r3', name: 'Molly', price: 300, labels: ['Doll', 'Puzzle', 'Baby'], createdAt: Date.now() ,inStock: false,},
            { id: 'r4', name: 'Dolly', price: 105, labels: ['Puzzle', 'Battery Powered', 'Art'], createdAt: Date.now() ,inStock: true},
            { id: 'r5', name: 'Fooly', price: 90, labels: ['Box game', 'Puzzle', 'Art'], createdAt: Date.now() ,inStock: true,}
           ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}




