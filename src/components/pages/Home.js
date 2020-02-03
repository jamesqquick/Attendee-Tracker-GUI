import React from 'react';
import { authenticationService } from '../../utils//Auth';
import Header from '../Header';
import EventForm from '../EventForm';
export default function Home(props) {
    const user = authenticationService.getUser();
    console.log(user);
    console.log(props);
    return (
        <div>
            <Header user={user} />
            <h1>Welcome to Attendee Tracker</h1>
            <EventForm history={props.history} />
        </div>
    );
}
