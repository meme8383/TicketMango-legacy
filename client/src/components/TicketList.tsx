import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Alert, Button, Spinner, Table } from 'react-bootstrap';
import IEvent from '../types/Event';

interface Ticket {
  _id: string;
  event_id: string;
  user_id: string | null;
  createdAt: Date;
  updatedAt: Date;
  scannedAt?: Date;
}

const TicketList = ({ event_id }: { event_id: string }) => {
  const { user, dispatch } = useAuthContext();
  const [error, setError] = useState<string>();
  const [tickets, setTickets] = useState<Ticket[]>();
  const [updated, setUpdated] = useState<boolean>(false);
  const [event, setEvent] = useState<IEvent>();

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`/api/events/${event_id}`, {});

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
  }, [event_id]);

  useEffect(() => {
    const fetchTickets = async () => {
      if (!user) return; // Return if no user is logged in

      // Get events from API
      const response = await fetch(`/api/events/${event_id}/tickets`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      if (response.ok) {
        const json = await response.json();
        setTickets(json);
        setError(undefined);
      } else if (response.status === 401) {
        // Expired token, logged-out user will be redirected to login page
        dispatch({ type: 'LOGOUT' });
      } else {
        setError('An unknown error occurred. Please try again later.');
      }
      setUpdated(false);
    };

    if (user) {
      fetchTickets();
    }
  }, [dispatch, user, event_id, updated]);

  const deleteTicket = (ticket_id: string) => {
    return async () => {
      if (!user) return; // Return if no user is logged in

      // Delete ticket
      const response = await fetch(
        `/api/events/${event_id}/tickets/${ticket_id}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${user.token}` },
        },
      );

      if (response.ok) {
        setTickets(undefined);
        setUpdated(true);
      } else if (response.status === 401) {
        // Expired token, logged-out user will be redirected to login page
        dispatch({ type: 'LOGOUT' });
      } else {
        setError('An unknown error occurred. Please try again later.');
      }
    };
  };

  const scanTicket = (ticket: Ticket) => {
    return async () => {
      if (!user) return; // Return if no user is logged in

      // Scan ticket
      const response = await fetch(
        `/api/events/${event_id}/tickets/${ticket._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({
            ...ticket,
            scannedAt: new Date().toISOString(),
          }),
        },
      );

      if (response.ok) {
        console.log(await response.json());
        setTickets(undefined);
        setUpdated(true);
      } else if (response.status === 401) {
        // Expired token, logged-out user will be redirected to login page
        dispatch({ type: 'LOGOUT' });
      } else {
        setError('An unknown error occurred. Please try again later.');
      }
    };
  };

  return (
    <>
      <h3>
        Attendees ({tickets?.length} / {event?.maxParticipants || 'No Max'})
      </h3>
      {tickets ? (
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Registered at</th>
              <th>Scanned at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((ticket) => (
              <tr key={ticket._id}>
                <td>{ticket._id}</td>
                <td>
                  {new Date(ticket.createdAt).toLocaleString('en', {
                    localeMatcher: 'best fit',
                    dateStyle: 'long',
                    timeStyle: 'short',
                  })}
                </td>
                <td>
                  {ticket.scannedAt
                    ? new Date(ticket.scannedAt).toLocaleString('en', {
                        localeMatcher: 'best fit',
                        dateStyle: 'long',
                        timeStyle: 'short',
                      })
                    : 'Not scanned'}
                </td>
                <td>
                  <Button
                    className="mx-1"
                    variant="danger"
                    onClick={deleteTicket(ticket._id)}
                  >
                    Delete
                  </Button>
                  <Button
                    className="mx-1"
                    variant="success"
                    disabled={!!ticket.scannedAt}
                    onClick={scanTicket(ticket)}
                  >
                    Scan
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Spinner animation="border" />
      )}
    </>
  );
};

export default TicketList;
