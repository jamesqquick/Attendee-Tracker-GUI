import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../utils/Auth';

export default function MyEvents() {
    const { user } = useAuth0();
    const [events, setEvents] = useState(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                //TODO: Get events
            } catch (err) {
                console.error(err);
            }
        }
        fetchEvents();
    }, []);

    return (
        <div>
            <p>here are my events</p>
            {events !== null && events.map((event) => <p>{event.name}</p>)}
        </div>
    );
}
