import React from 'react';
import { useEffect } from 'react';
import { useEventsContext } from '../hooks/useEventsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// components
import EventDetails from './EventDetails';
import { Row, Spinner } from 'react-bootstrap';

const EventList = () => {
  const { events, dispatch } = useEventsContext();
  const { user, dispatch: authDispatch } = useAuthContext();

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user) return;

      const response = await fetch('/api/events', {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_EVENTS', payload: json });
      } else if (response.status === 401) {
        authDispatch({ type: 'LOGOUT' });
      }
    };

    if (user) {
      fetchEvents();
    }
  }, [dispatch, user, authDispatch]);

  return (
    <div className="events">
      <h3>My events</h3>
      {events ? (
        events.length > 0 ? (
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
