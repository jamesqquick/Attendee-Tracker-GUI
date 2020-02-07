import React, { useState, useEffect } from 'react';
import AttendeeList from '../components/AttendeeList';
import GuestRSVPForm from '../components/GuestRSVPForm';
import { useAuth0 } from '../utils/Auth0';

export default function Event(props) {
    const { params } = props.match;
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, getTokenSilently } = useAuth0();
    const [hasRSVPed, sethasRSVPed] = useState(false);

    //TODO: if user owns the event, show edit abilities
    //TODO: render two different types ->  editable, and registerable
    //TODO: four states, logged in and rsvped, logged in and not rsvped, guest and rsvped, guest and not rsvped
    //If not logged in, then allow anonymous submission

    async function fetchEvent() {
        try {
            const headers = {};
            let token;
            if (user) {
                token = await getTokenSilently();
                headers['Authorization'] = `Bearer ${token}`;
            }
            const response = await fetch(`/api/events/${params.eventId}`, {
                method: 'GET',
                headers
            });
            const event = await response.json();
            setEvent(event);
            //Check to see if the user has rsvped
            if (user) {
                for (let i = 0; i < event.attendees.length; i++) {
                    const attendee = event.attendees[i];
                    if (attendee._id === user.sub) {
                        sethasRSVPed(true);
                    }
                }
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    }
    useEffect(() => {
        console.log('Checking event');
        fetchEvent();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getTokenSilently, params.eventId, user, hasRSVPed]);

    const loggedInRSVP = async () => {
        try {
            const attendee = {
                name: user.nickname,
                email: user.email,
                _id: user.sub
            };
            const token = await getTokenSilently();
            const response = await fetch(
                `/api/events/${params.eventId}/rsvp/${user.sub}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(attendee)
                }
            );
            const responseData = await response.json();
            sethasRSVPed(true);
        } catch (err) {
            console.error(err);
        }
    };

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
                    {!user && (
                        <GuestRSVPForm
                            eventId={event._id}
                            rsvpCompleted={fetchEvent}
                        />
                    )}
                    {user && !hasRSVPed && (
                        <button onClick={loggedInRSVP}>RSVP</button>
                    )}

                    <AttendeeList attendees={event.attendees} />
                </>
            )}
        </div>
    );
}
