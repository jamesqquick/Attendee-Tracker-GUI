import React, { useState, useEffect } from 'react';
import AttendeeList from '../AttendeeList';
import AttendeeForm from '../AttendeeForm';
import { authenticationService } from '../../utils//Auth';

export default function Event(props) {
    const { params } = props.match;
    console.log(params);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    //use the user to register or not
    const user = authenticationService.getUser();

    useEffect(() => {
        async function fetchEvent() {
            try {
                const res = await authenticationService.fetchWithAuthHeader(
                    `/api/events/${params.eventId}`,
                    {
                        method: 'GET'
                    }
                );
                setEvent(res);
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
