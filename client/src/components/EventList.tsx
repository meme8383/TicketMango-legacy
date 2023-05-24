import React, { useState } from 'react';
import { useEffect } from 'react';
import { useEventsContext } from '../hooks/useEventsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import EventDetails from './EventDetails';
import { Alert, Row, Spinner } from 'react-bootstrap';

const EventList = () => {
  const { events, dispatch } = useEventsContext();
  const { user, dispatch: authDispatch } = useAuthContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return; // Return if no user is logged in

      // Get events from API
      const response = await fetch('/api/events', {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setLoading(false);
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'SET_EVENTS', payload: json });
      } else if (response.status === 401) {
        // Expired token, logged-out user will be redirected to login page
        authDispatch({ type: 'LOGOUT' });
      } else {
        setError('An unknown error occurred. Please try again later.');
      }
    };

    if (user) {
      fetchEvents();
    }
  }, [dispatch, user, authDispatch]);

  return (
    <div className="events">
      <h3>My events</h3>
      {!loading ? (
        error ? (
          <Alert variant="danger">{error}</Alert>
        ) : events.length > 0 ? (
          <Row className="container-fluid">
            {events.map((event) => (
              <EventDetails key={event._id} event={event} />
            ))}
          </Row>
        ) : (
          <p>
            It&apos;s quiet here. <a href="/events/new">Create a new event?</a>
          </p>
        )
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
};

export default EventList;
