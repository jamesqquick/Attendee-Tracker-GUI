import React from 'react';

export default function GuestRSVPForm({ eventId, rsvpCompleted }) {
    console.log(eventId);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');

    const reset = () => {
        setEmail(0);
        setName('');
    };

    const submitAttendee = async (e) => {
        e.preventDefault();
        try {
            const attendee = { name, email };
            const response = await fetch(`/api/events/${eventId}/rsvp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(attendee)
            });
            const responseData = await response.json();
            reset();
            rsvpCompleted();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <form onSubmit={submitAttendee}>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    placeolder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></input>
                <button type="submit">RSVP</button>
            </form>
        </div>
    );
}
