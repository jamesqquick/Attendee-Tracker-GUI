import React from 'react';
import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
    return (
        <div>
            <Link to={`/event/${event._id}`}>
                <h3>{event.title}</h3>
            </Link>
            <p>{event.description}</p>
            <p>{event.location}</p>
            <p>{event.date}</p>
        </div>
    );
}
