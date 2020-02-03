import React from 'react';

export default function AttendeeForm() {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState(0);

    const reset = () => {
        setEmail(0);
        setName('');
    };

    const submitAttendee = async (e) => {
        e.preventDefault();
        const attendee = { name, email };
        try {
            console.log(attendee);
            reset();
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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
