import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../utils/Auth';

export default function MyEvents() {
    const { user, getTokenSilently } = useAuth0();
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState();

    useEffect(() => {
        async function fetchEvents() {
            try {
                const token = await getTokenSilently();
                const response = await fetch('', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const events = await response.json();
                setEvents(events);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
        fetchEvents();
    }, [getTokenSilently]);

    return (
        <div>
            <p>here are my events</p>
            {events !== null && events.map((event) => <p>{event.name}</p>)}
        </div>
    );
}
