import React, { useState, useEffect } from 'react';
import AttendeeList from '../components/AttendeeList';
import AttendeeForm from '../components/AttendeeForm';
import { useAuth0 } from '../utils/Auth';

export default function Event(props) {
    const { params } = props.match;
    console.log(params);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    //if user owns the event, show edit abilities
    const { user, getTokenSilently } = useAuth0();

    useEffect(() => {
        async function fetchEvent() {
            try {
                const token = await getTokenSilently();
                const response = await fetch('', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response);
                const responseData = await response.json();
                setEvent(responseData);
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
        fetchEvent();
    }, [getTokenSilently, params.eventId]);

    return (
        <div>
            {loading ? (
                <p>Loading</p>
            ) : (
                <>
                    <h1>{event.title}</h1>
                    <AttendeeForm eventId={event.eventId} />
                    <AttendeeList attendees={event.attendees} />
                </>
            )}
        </div>
    );
}
