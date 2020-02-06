import React, { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import { useAuth0 } from '../utils/Auth0';
import EventCard from '../components/EventCard';
export default function Home(props) {
    const { user } = useAuth0();
    const [events, setEvents] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            try {
                const response = await fetch('/api/events', {
                    method: 'GET'
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
    }, []);
    return (
        <div>
            <h1>Welcome to Attendee Tracker</h1>
            {user && <EventForm />}
            {/* search events */}
            <h2>Recent Events</h2>
            {events &&
                events.map((event) => (
                    <EventCard key={event._id} event={event}></EventCard>
                ))}
        </div>
    );
}
