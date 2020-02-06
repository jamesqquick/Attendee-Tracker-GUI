import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useAuth0 } from '../utils/Auth0';

const ProtectedRoute = ({ component: Component, path, ...rest }) => {
    const { isAuthenticated, loading, loginWithRedirect } = useAuth0();

    useEffect(() => {
        if (loading || isAuthenticated) return;

        const login = async () => {
            await loginWithRedirect({ appState: { targetUrl: path } });
        };
        login();
    }, [isAuthenticated, loading, loginWithRedirect, path]);

    const render = (props) =>
        isAuthenticated === true ? <Component {...props} /> : null;

    return <Route path={path} render={render} {...rest} />;
};

export default ProtectedRoute;
