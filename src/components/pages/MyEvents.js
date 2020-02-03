import React, { useState, useEffect } from 'react';
import { authenticationService } from '../../utils//Auth';

export default function MyEvents() {
    const user = authenticationService.getUser();
    const [events, setEvents] = useState(null);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const res = await authenticationService.fetchWithAuthHeader(
                    `/api/events/me`,
                    {
                        method: 'GET'
                    }
                );
                setEvents(res);
                setLoading(false);
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
