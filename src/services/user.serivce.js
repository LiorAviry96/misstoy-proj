
import { storageService } from './async-storage.service'
import { utilService } from './util.service'


const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const STORAGE_KEY_USER_DB = 'user'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    getEmptyUser,
    createUser
}

window.userService = userService
_createUsers()

function getUsers() {
    return storageService.query(STORAGE_KEY_USER_DB)
}

async function getById(userId) {
    const user = await storageService.get(STORAGE_KEY_USER_DB, userId)
    return user
}

function remove(userId) {
    return storageService.remove(STORAGE_KEY_USER_DB, userId)
}

async function update(userToUpdate) {
    const user = await getById(userToUpdate.id)
    const updatedUser = await storageService.put(STORAGE_KEY_USER_DB, { ...user, ...userToUpdate })
    if (getLoggedinUser().id === updatedUser.id) saveLocalUser(updatedUser)
    return updatedUser
}



function login({ username }) {
    return storageService.query(STORAGE_KEY_USER_DB)
        .then(users => {
            const user = users.find(user => user.username === username)
            console.log('user from service login function', user)
            if (user) return saveLocalUser(user)
            else return Promise.reject('Invalid login')
        })
}


async function signup({ username, password, fullname, isAdmin }) {
    const user = {
        username,
        password,
        fullname,
        isAdmin
    }
    console.log('user sign up', user )
    return storageService.post(STORAGE_KEY_USER_DB, user)
        .then(saveLocalUser(user))

}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
    console.log('save start')
    user = { id: user.id, fullname: user.fullname, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    console.log('user saved to local', user)
    return user
}

function getLoggedinUser() {
    
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))

}



function getEmptyUser() {
    return {
        username: '',
        fullname: '',
        password: '',
        idAdmin: '',
    }
}

function createUser(username = '', fullname = '', password= '' , idAdmin='') {
    return {
        username,
        fullname,
        password,
        idAdmin,
    }
}


function _createUsers() {
    let users = utilService.loadFromStorage(STORAGE_KEY_USER_DB)
    if (!users || !users.length) {
        users = [
            { id: 'r1', username: 'Bar123', fullname: 'Bar Levi', password:'12345678' ,idAdmin: true},
            { id: 'r2', username: 'Sharon96', fullname: 'Sharon Shachar', labpasswordels: '987654321', idAdmin: true},
            { id: 'r3', username: 'Yard23', fullname: 'Yarden Cohen', password: '05031996' ,idAdmin: false},
            
           ]
        utilService.saveToStorage(STORAGE_KEY_USER_DB, users)
    }
}