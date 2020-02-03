import React from 'react';
import { authenticationService } from '../../utils/Auth';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) =>
            authenticationService.isLoggedIn() ? (
                <Component {...props} />
            ) : (
                <Redirect to={'/login'} />
            )
        }
    />
);
