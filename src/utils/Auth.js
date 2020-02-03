import React, { useState, useEffect, useContext } from 'react';
import createAuth0client from '@auth0/auth0-spa-js';

const DEFAULT_REDIRECT_CALLBACK = () => {
    window.history.replaceState({}, document.title, window.location.pathname);
};

export const Auth0Context = React.createContext();
export const useAuth0 = () => useContext(Auth0Context);

export const Auth0Provider = ({
    children,
    onRedirectCallback = DEFAULT_REDIRECT_CALLBACK,
    ...initOptions
}) => {
    const [isAuthenticated, setIsAuthenticated] = useState();
    const [user, setUser] = useState();
    const [auth0Client, setAuth0Client] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth0 = async () => {
            const auth0FromHook = await createAuth0client(initOptions);
            console.log(auth0FromHook);
            setAuth0Client(auth0FromHook);

            if (
                window.location.search.includes('code=') &&
                window.location.search.includes('state=')
            ) {
                const {
                    appState
                } = await auth0FromHook.handleRedirectCallback();
                onRedirectCallback(appState);
            }

            const isAuthenticated = await auth0FromHook.isAuthenticated();
            setIsAuthenticated(isAuthenticated);

            if (isAuthenticated) {
                const user = await auth0FromHook.getUser();
                setUser(user);
            }

            setLoading(false);
        };

        initAuth0();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Auth0Context.Provider
            value={{
                loading,
                isAuthenticated,
                user,
                getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
                loginWithRedirect: (...p) =>
                    auth0Client.loginWithRedirect(...p),
                getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
                getTokenWithPopup: (...p) =>
                    auth0Client.getTokenWithPopup(...p),
                logout: (...p) => auth0Client.logout(...p)
            }}
        >
            {children}
        </Auth0Context.Provider>
    );
};
