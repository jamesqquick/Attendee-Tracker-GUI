import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { authenticationService } from '../utils/Auth';

const AttendeesList = ({ attendees }) => {
    return (
        <div>
            <h2>Attendees</h2>
            {attendees.map((attendee) => (
                <div key={attendee._id}>
                    <p>{attendee.name}</p>
                    <p>{attendee.email}</p>
                </div>
            ))}
        </div>
    );
};

export default withRouter(AttendeesList);
