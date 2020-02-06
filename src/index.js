import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';

import { Auth0Provider } from './utils/Auth0';
import history from './utils/History';

const onRedirectCallback = (appState) => {
    history.push(
        appState && appState.targetUrl
            ? appState.targetUrl
            : window.location.pathname
    );
};

const routing = (
    <Fragment>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN}
            client_id={process.env.REACT_APP_AUTH0_CLIENT_ID}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            audience={process.env.REACT_APP_AUTH0_AUDIENCE}
        >
            <App />
        </Auth0Provider>
    </Fragment>
);

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
