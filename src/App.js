import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import NotFound from './pages/NotFound';
import { useAuth0 } from './utils/Auth';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Event from './pages/Event';
import MyEvents from './pages/MyEvents';
function App() {
    const { loading } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <Router>
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
