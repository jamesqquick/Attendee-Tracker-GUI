import React from 'react';
import { withRouter } from 'react-router';

const AttendeesList = ({ attendees }) => {
    return (
        <div>
            <h2>Attendees</h2>
            {attendees.map((attendee, index) => (
                <div key={attendee._id || index}>
                    <p>{attendee.name}</p>
                    <p>{attendee.email}</p>
                </div>
            ))}
        </div>
    );
};

export default withRouter(AttendeesList);
