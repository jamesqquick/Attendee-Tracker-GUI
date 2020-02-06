import React, { useState, useEffect } from 'react';
import { useAuth0 } from '../utils/Auth0';
import EventForm from '../components/EventForm';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';

export default function MyEvents() {
    const { user, getTokenSilently } = useAuth0();
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState();

    useEffect(() => {
        async function fetchEvents() {
            try {
                const token = await getTokenSilently();
                const response = await fetch('/api/events/myEvents', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const eventsData = await response.json();
                setEvents(eventsData);
                console.log(eventsData);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
        fetchEvents();
    }, [getTokenSilently]);

    return (
        <div>
            {user && <EventForm />}
            {events !== null && (
                <div>
                    <p>here are my events</p>
                    {events.map((event) => (
                        <EventCard key={event._id} event={event}></EventCard>
                    ))}
                </div>
            )}
        </div>
    );
}
