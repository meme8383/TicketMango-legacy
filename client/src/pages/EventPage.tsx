import React, { useEffect, useState } from 'react';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import IEvent from '../types/Event';

const EventPage = () => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [event, setEvent] = useState<IEvent>();

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`/api/events/${id}`, {});

      setLoading(false);
      if (response.ok) {
        const json = await response.json();
        setEvent(json);
      } else {
        try {
          const json = await response.json();
          setError(json.message);
        } catch (e) {
          setError('An unknown error occurred. Please try again later.');
        }
      }
    };

    fetchEvent();
  }, [id]);

  return (
    <Container>
      {loading ? (
        <Spinner animation="border" />
      ) : !event || error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div className="event">
          <h3>{event.title}</h3>
          <p>
            <strong>Date: </strong>
            {new Date(event.date).toLocaleString('en', {
              localeMatcher: 'best fit',
              dateStyle: 'long',
              timeStyle: 'short',
            })}
          </p>
          {event.location && (
            <p>
              <strong>Location: </strong>
              {event.location}
            </p>
          )}
          {event.description && <p>{event.description}</p>}
        </div>
      )}
    </Container>
  );
};

export default EventPage;
