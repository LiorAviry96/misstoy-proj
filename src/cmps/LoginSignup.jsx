import { useState, useEffect } from 'react'
//import { useSelector } from 'react-redux';
import { loadUsers } from '../store/user/user.actions.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { login, signup } from '../store/user/user.actions.js';
import { userService } from '../services/user.serivce.js';

export function LoginSignup() {
    //const users = useSelector(storeState => storeState.userModule.users)
    const [isSignup, setIsSignUp] = useState(false)
    const [credentials, setCredentials] = useState(userService.getEmptyUser())


    useEffect(() => {
        loadUsers()
    }, [])

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials(prevCreds => ({ ...prevCreds, [field]: value }))
    }


    function handleSubmit(ev) {
        ev.preventDefault()
        onSubmit(credentials)
    }


    function onSubmit(credentials) {
        isSignup ? onSignup(credentials) : onLogin(credentials)
    }


    function onLogin(credentials) {
        login(credentials)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { showErrorMsg('Oops try again', err) })
    }


    function onSignup(credentials) {
        signup(credentials)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch((err) => { showErrorMsg('Oops try again', err) })
    }


  
    return (
        <div className="login-page">
        <form className="login-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="username"
                value={credentials.username}
                placeholder="Username"
                onChange={handleChange}
                required
                autoFocus
            />
            <input
                type="password"
                name="password"
                value={credentials.password}
                placeholder="Password"
                onChange={handleChange}
                required
                autoComplete="off"
            />
            {isSignup && <input
                type="text"
                name="fullname"
                value={credentials.fullname}
                placeholder="Full name"
                onChange={handleChange}
                required
            />}
            <button>{isSignup ? 'Signup' : 'Login'}</button>
        </form>


        <div className="btns">
            <a href="#" onClick={() => setIsSignUp(!isSignup)}>
                {isSignup ?
                    'Already a member? Login' :
                    'New user? Signup here'
                }
            </a >
        </div>
    </div >

    )
}