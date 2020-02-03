import React, { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import { useAuth0 } from '../utils/Auth';
export default function Home(props) {
    const { user } = useAuth0();
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch('');
                const events = await response.json();
                setEvents(events);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
        fetchEvents();
    }, []);
    return (
        <div>
            <h1>Welcome to Attendee Tracker</h1>
            {user && <EventForm history={props.history} />}
            {/* search events */}
            {/* display events */}
            {events &&
                events.map((event) => (
                    <div key={event.id}>
                        <p>event</p>
                    </div>
                ))}
        </div>
    );
}
