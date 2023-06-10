import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { Alert, Spinner, Table } from 'react-bootstrap';

interface Ticket {
  _id: string;
  createdAt: string;
}

const TicketList = ({ event_id }: { event_id: string }) => {
  const { user, dispatch } = useAuthContext();
  const [error, setError] = useState<string>();
  const [tickets, setTickets] = useState<Ticket[]>();

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
      } else if (response.status === 401) {
        // Expired token, logged-out user will be redirected to login page
        dispatch({ type: 'LOGOUT' });
      } else {
        setError('An unknown error occurred. Please try again later.');
      }
    };

    if (user) {
      fetchTickets();
    }
  }, [dispatch, user, event_id]);

  return (
    <>
      {tickets ? (
        <Table striped bordered>
          <thead>
            <tr>
              <th>ID</th>
              <th>Registered at</th>
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
