import React from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import TicketList from '../components/TicketList';
import Scanner from '../components/Scanner';

const EventScanner = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Container>
      <Scanner event_id={id as string} />
      <TicketList event_id={id as string} />
    </Container>
  );
};

export default EventScanner;
