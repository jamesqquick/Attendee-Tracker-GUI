import React from 'react';
import { useAuth0 } from '../utils/Auth0';
export default function EventForm(props) {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [date, setDate] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const { user, getTokenSilently } = useAuth0();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const event = { title, description, date, location };
        try {
            const token = await getTokenSilently();
            event.user = token.sub;
            const response = await fetch('/api/events', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(event)
            });
            const responseData = await response.json();
            const eventId = responseData._id;
            //history.push(`/event/${eventId}`);
            resetForm();
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setDate('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add Event</h2>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                title="title"
                value={title}
                placeholder="My First Event"
                onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="description">Description</label>
            <textarea
                type="text"
                title="description"
                value={description}
                placeholder="Tell me about your event"
                onChange={(e) => setDescription(e.target.value)}
            />
            <label htmlFor="date">Date</label>
            <input
                type="date"
                title="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <label htmlFor="location">Location</label>
            <input
                type="text"
                title="Location"
                value={location}
                placeholder="115 Some Place Ave"
                onChange={(e) => setLocation(e.target.value)}
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}
            </button>
        </form>
    );
}
