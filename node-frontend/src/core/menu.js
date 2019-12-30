import React from 'react'
import { Link, withRouter } from 'react-router-dom'

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: '#ff9900' }
    else return { color: '#fff' }
}
const signout=()=>{
    
}
const menu = ({ history }) => {
    return (
        <div>
            <ul class="nav nav-tabs bg-primary">
                <li class="nav-item active">
                    <Link class="nav-link" to="/" style={isActive(history, '/')}>Home</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/signup" style={isActive(history, '/signup')}>SignUp</Link>
                </li>
                <li class="nav-item">
                    <Link class="nav-link" to="/signin" style={isActive(history, '/signin')}>SignIn</Link>
                </li>
            </ul>
        </div>
    )
}
export default withRouter(menu)