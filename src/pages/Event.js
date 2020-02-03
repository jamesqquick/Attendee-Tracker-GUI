import React, { useState, useEffect } from 'react';
import AttendeeList from '../components/AttendeeList';
import AttendeeForm from '../components/AttendeeForm';
import { useAuth0 } from '../utils/Auth';

export default function Event(props) {
    const { params } = props.match;
    console.log(params);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    //use the user to register or not
    const { user } = useAuth0();

    useEffect(() => {
        async function fetchEvent() {
            try {
                //TODO: load event
                setLoading(false);
            } catch (err) {
                console.error(err);
            }
        }
        fetchEvent();
    }, [params.eventId]);

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
