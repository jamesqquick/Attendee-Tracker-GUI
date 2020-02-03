import React from 'react';
import { authenticationService } from '../../utils/Auth';
import { Redirect } from 'react-router-dom';

export default function Logout() {
    authenticationService.logout();
    return <Redirect to={'/'} />;
}
