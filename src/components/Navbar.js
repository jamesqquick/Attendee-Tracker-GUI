import React from 'react';
import { useAuth0 } from '../utils/Auth';

export default function Navabr() {
    const { user, loginWithRedirect, logout } = useAuth0();

    return user ? (
        <button onClick={logout}>Logout</button>
    ) : (
        <div>
            <button onClick={loginWithRedirect}>Login</button>
        </div>
    );
}
