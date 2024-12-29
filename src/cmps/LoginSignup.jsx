import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { loadUsers } from '../store/user/user.actions.js';
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';
import { login, signup } from '../store/user/user.actions.js';
import { userService } from '../services/user.serivce.js';

export function LoginSignup() {
    const users = useSelector(storeState => storeState.userModule.users)
    const [credentials, setCredentials] = useState(userService.getEmptyUser())
    const [isSignup, setIsSignup] = useState(false)

    useEffect(() => {
        loadUsers()
    }, [])

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function onLogin(credentials) {
        login(credentials)
            .then(() => { showSuccessMsg('Logged in successfully') })
            .catch((err) => { showErrorMsg(`Oops try again: ${err}`) })
    }


   
    function onSignup(credentials) {
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        signup(credentials)
            .then(() => { showSuccessMsg('Signed in successfully') })
            .catch((err) => { showErrorMsg(`Oops try again: ${err}`) })
    }


    function toggleSignup() {
        setIsSignup(!isSignup)
    }

  
    return (
        <div className="login-page">
            <p>
                <button className="btn-link" onClick={toggleSignup}>Go To {!isSignup ? 'Signup' : 'Login'}</button>
            </p>
            {!isSignup &&
                <form className="login-form" onSubmit={onLogin}>
                    <select
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                    >
                        <option value="">Select User</option>
                        {users.map(user => <option key={user.id} value={user.username}>{user.fullname}</option>)}
                    </select>
                    <button>Login!</button>
                </form>
            }
            <div className="signup-section">
                {isSignup &&
                    <form className="signup-form" onSubmit={onSignup}>
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Fullname"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <button >Signup!</button>
                    </form>
                }
            </div>
        </div>
    )
}