import React from 'react';
import { useEventsContext } from '../hooks/useEventsContext';
import { useAuthContext } from '../hooks/useAuthContext';

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Button, Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const EventDetails = ({ event }) => {
  const { dispatch } = useEventsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/events/' + event._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_EVENT', payload: json });
    }
  };

  return (
    <Card className="event-details m-3">
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>
          <strong>Date: </strong>
          {formatDistanceToNow(new Date(event.date), { addSuffix: true })}
        </Card.Text>
        {event.description && (
          <Card.Text>
            <strong>Description: </strong>
            {event.description}
          </Card.Text>
        )}
        {event.location && (
          <Card.Text>
            <strong>Location: </strong>
            {event.location}
          </Card.Text>
        )}
        {event.maxParticipants && (
          <Card.Text>
            <strong>Max Participants: </strong>
            {event.maxParticipants}
          </Card.Text>
        )}
        <LinkContainer to={`/events/${event._id}`}>
          <Button className="m-1" variant="primary">
            Details
          </Button>
        </LinkContainer>
        <Button className="m-1" variant="danger" onClick={handleClick}>
          Delete
        </Button>
        <Card.Footer>
          <p>
            Modified:{' '}
            {formatDistanceToNow(new Date(event.createdAt), {
              addSuffix: true,
            })}
          </p>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export default EventDetails;
