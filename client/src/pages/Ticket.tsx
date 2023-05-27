import React, { useEffect, useState } from 'react';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';

interface ITicket {
  _id: string;
  event_id: string;
  info: JSON;
}

const Ticket = () => {
  const { id, ticketID } = useParams<{ id: string; ticketID: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [ticket, setTicket] = useState<ITicket>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchTicket = async () => {
      const response = await fetch(`/api/events/${id}/tickets/${ticketID}`, {});

      setLoading(false);
      if (response.ok) {
        const json = await response.json();
        setTicket(json);
      } else {
        try {
          const json = await response.json();
          setError(json.message);
        } catch (e) {
          setError('An unknown error occurred. Please try again later.');
        }
      }
    };

    fetchTicket();
  }, [id, ticketID]);

  return (
    <Container>
      {loading ? (
        <Spinner animation="border" />
      ) : !ticket || error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <div>
          <h1>Your Ticket</h1>
          <p>Save this link. This is your event ticket.</p>
          <QRCode value={ticket._id} />
          <p>
            <strong>ID:</strong> {ticket._id}
          </p>
        </div>
      )}
    </Container>
  );
};

export default Ticket;
