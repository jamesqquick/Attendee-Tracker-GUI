import React from 'react';
import './App.css';
import { Route, Router, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import { useAuth0 } from './utils/Auth0';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Event from './pages/Event';
import MyEvents from './pages/MyEvents';
import history from './utils/History';
function App() {
    const { loading, user } = useAuth0();
    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Router history={history}>
            <Navbar />
            <div className="container">
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/event/:eventId" component={Event} />
                    <ProtectedRoute path="/myEvents" component={MyEvents} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
