import React from 'react';
import EventForm from '../components/EventForm';
import { useAuth0 } from '../utils/Auth';
export default function Home(props) {
    const { user } = useAuth0();
    return (
        <div>
            <h1>Welcome to Attendee Tracker</h1>
            {user && <EventForm history={props.history} />}
        </div>
    );
}
