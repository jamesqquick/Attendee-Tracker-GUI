import React from 'react';
import { useAuth0 } from '../utils/Auth0';
import { Link } from 'react-router-dom';

export default function Navabr() {
    const { user, loginWithRedirect, logout } = useAuth0();

    return user ? (
        <>
            <button onClick={logout}>Logout</button>
            <Link to="/">Home</Link>
            <Link to="/myEvents">My Events</Link>
        </>
    ) : (
        <div>
            <button onClick={loginWithRedirect}>Login</button>
            <Link to="/">Home</Link>
        </div>
    );
}
