import React, { useState, useEffect } from 'react';
import AttendeeList from '../components/AttendeeList';
import GuestRSVPForm from '../components/GuestRSVPForm';
import { useAuth0 } from '../utils/Auth0';

export default function Event(props) {
    const { params } = props.match;
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, getTokenSilently } = useAuth0();

    //TODO: if user owns the event, show edit abilities
    //TODO: render two different types ->  editable, and registerable
    //If not logged in, then allow anonymous submission

    useEffect(() => {
        async function fetchEvent() {
            try {
                const headers = {};
                if (user) {
                    const token = await getTokenSilently();
                    headers['Authorization'] = `Bearer ${token}`;
                }
                console.log(params.eventId);
                const response = await fetch(`/api/events/${params.eventId}`, {
                    method: 'GET',
                    headers
                });
                const event = await response.json();
                setEvent(event);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        }
        fetchEvent();
    }, [getTokenSilently, params.eventId, user]);

    return (
        <div>
            {loading ? (
                <p>Loading</p>
            ) : (
                <>
                    <h1>{event.title}</h1>
                    <p>{event.description}</p>
                    <p>{event.location}</p>
                    <p>{event.date}</p>
                    {!user && <GuestRSVPForm eventId={event._id} />}
                    <AttendeeList attendees={event.attendees} />
                </>
            )}
        </div>
    );
}
