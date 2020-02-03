import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ user }) {
    return user ? (
        <Link className="link-btn" to="/logout">
            Logout
        </Link>
    ) : (
        <div>
            <Link className="link-btn" to="/login">
                Login
            </Link>
            <Link className="link-btn" to="/register">
                Register
            </Link>
        </div>
    );
}
