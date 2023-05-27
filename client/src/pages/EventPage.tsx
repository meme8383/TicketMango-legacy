import React, { useEffect, useState } from 'react';
import { Alert, Button, Container, Form, Spinner } from 'react-bootstrap';
import { Navigate, useParams } from 'react-router-dom';
import IEvent from '../types/Event';
import { useTicket } from '../hooks/useTicket';

const EventPage = () => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState<boolean>(true);
  const [eventError, setError] = useState<string>();
  const [ticketError, setTicketError] = useState<string>();
  const [event, setEvent] = useState<IEvent>();

  const { create, error, isLoading, ticketID } = useTicket();

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
          setError('Error: ' + json.error);
        } catch (e) {
          setError('An unknown error occurred. Please try again later.');
        }
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await create(id as string, {} as JSON);
  };

  useEffect(() => {
    // API error handling
    switch (error) {
      case null:
      case undefined:
      case '':
        setTicketError('');
        break;
      default:
        setTicketError('Something went wrong. Please try again later.');
    }
  }, [error]);

  return (
    <Container>
      {ticketID ? <Navigate to={`/events/${id}/tickets/${ticketID}`} /> : <></>}
      {loading ? (
        <Spinner animation="border" />
      ) : !event || eventError ? (
        <Alert variant="danger">{eventError}</Alert>
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
          <Form onSubmit={handleSubmit}>
            <Button
              className="mb-3"
              variant="primary"
              type="submit"
              disabled={isLoading}
            >
              Get Ticket
            </Button>
            {isLoading && <Spinner animation="border" />}
            {ticketError && <Alert variant="danger">{ticketError}</Alert>}
          </Form>
        </div>
      )}
    </Container>
  );
};

export default EventPage;
