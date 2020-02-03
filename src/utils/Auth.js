import decode from 'jwt-decode';

const saveToken = (token) => {
    localStorage.setItem('user_token', token);
};

const isLoggedIn = () => {
    //TODO: can check for expiration
    return !!localStorage.getItem('user_token');
};

const logout = () => {
    localStorage.removeItem('user_token');
};

const getToken = () => {
    return localStorage.getItem('user_token');
};

const getUser = () => {
    try {
        return decode(getToken());
    } catch (err) {
        return null;
    }
};

const fetchWithAuthHeader = async (url, options) => {
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };

    if (isLoggedIn()) {
        headers['Authorization'] = 'Bearer ' + getToken();
    }

    const res = await fetch(url, {
        headers,
        ...options
    });
    checkStatus(res);
    return await res.json(); //will either return or throw error based on status
};

const checkStatus = (response) => {
    if (!(response.status >= 200 && response.status < 300)) {
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

export const authenticationService = {
    saveToken,
    isLoggedIn,
    logout,
    getToken,
    getUser,
    fetchWithAuthHeader
};
