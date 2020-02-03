import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './components/pages/Home';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Logout from './components/Auth/Logout';
import Event from './components/pages/Event';
import MyEvents from './components/pages/MyEvents';
const routing = (
    <Router>
        <div className="container">
            <Route path="/" exact component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <ProtectedRoute path="/logout" component={Logout} />
            <Route path="/event/:eventId" component={Event} />
            <ProtectedRoute path="/myEvents" component={MyEvents} />
        </div>
    </Router>
);
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
